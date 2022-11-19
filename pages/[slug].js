import { auth, db } from "../utils/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { FaRegCommentDots } from "react-icons/fa";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";

export default function Comments() {
  const router = useRouter();
  const routeData = router.query;
  const [postData, setPostData] = useState({});
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);

  //get post data from firbase
  const getPostData = async () => {
    const docRef = doc(db, "posts", routeData.slug);
    const docData = await getDoc(docRef);
    setPostData(docData.data());
  };

  //submit comment
  const submitComment = async (e) => {
    e.preventDefault();
    //check if user logged in
    if (!auth.currentUser) return router.push("/auth/login");
    if (!comment) {
      toast.error("Don't leave an empty comment 😡", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.slug);
    await updateDoc(docRef, {
      comments: arrayUnion({
        comment,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    //reset comment
    setComment("");
  };

  //get comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.slug);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllComments(snapshot.data().comments);
    });
    setLoading(false);
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getPostData();
    getComments();
  }, [router.isReady]);

  return (
    <section>
      <Message {...postData}></Message>
      <div>
        <form onSubmit={submitComment} className="py-6 flex">
          <div className="flex items-center rounded-l-lg w-full bg-gray-800 p-2 gap-2 text-white text-sm">
            <FaRegCommentDots className="text-lg" />
            <input
              className="bg-transparent outline-none text-sm w-full"
              type="text"
              placeholder="Add comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-800 rounded-r-lg hover:bg-cyan-600 p-2 text-white text-sm"
          >
            Submit
          </button>
        </form>
        {!loading ? (
          <div className="py-6">
            <h2>Comments</h2>
            {allComments?.map((comment) => (
              <div
                key={comment.time}
                className="my-4 p-4 border-gray-800 border-solid border-b-2"
              >
                <div className="flex gap-2 items-center ">
                  <img
                    className="w-8 rounded-full"
                    src={comment.avatar}
                    alt={comment.username}
                    referrerPolicy="no-referrer"
                  />
                  <div className="py-1">
                    <h2 className="text-sm font-medium">{comment.username}</h2>
                    <p className="text-xs text-gray-400">
                      {moment(comment.time.toDate()).calendar()}
                    </p>
                  </div>
                </div>
                <h2 className="p-4">{comment.comment}</h2>
              </div>
            ))}
            {!allComments && (
              <p className="py-10 text-center">No comments to display</p>
            )}
          </div>
        ) : (
          <div className="flex justify-center py-20" role="status">
            <svg
              class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </section>
  );
}
