import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Message from "../components/Message";
import { BiLogOut, BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Search from "../components/Search";

export default function Dashboard() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  //see if user logged:
  const getData = async () => {
    if (loading) return;
    if (!user) return router.push("/auth/login");

    //If we have a user => get data from firebase:
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };
  useEffect(() => {
    getData();
  }, [user, loading]);

  //search for posts
  const [queryPosts, setQueryPosts] = useState("");
  const filtredPosts = posts.filter(
    (post) =>
      post.description.toLowerCase().includes(queryPosts.toLowerCase()) ||
      post.title.toLowerCase().includes(queryPosts.toLowerCase())
  );

  //Handle the Search:
  const handleQueryPosts = (e) => {
    setQueryPosts(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-semibold">Your posts</h1>
        <button
          className="flex gap-2 items-center p-2 hover:text-cyan-800"
          onClick={() => auth.signOut()}
        >
          <BiLogOut className="text-xl" />
          Sign out
        </button>
      </div>
      <Search handleQueryPosts={handleQueryPosts} />
      <div>
        {filtredPosts.map((filtredPost) => (
          <Message {...filtredPost} key={filtredPost.id}>
            <div className="flex gap-2 items-center">
              <button className="flex gap-2 items-center justify-center px-4 py-2 text-pink-600 hover:text-pink-300">
                <RiDeleteBin6Line />
                Delete
              </button>
              <button className="flex gap-2 items-center justify-center px-4 py-2 text-teal-600 hover:text-teal-300">
                <BiEdit />
                Edit
              </button>
            </div>
          </Message>
        ))}
      </div>
    </div>
  );
}
