import { auth, db } from "../utils/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { FaRegCommentDots } from "react-icons/fa";
import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";

export default function Comments() {
  const router = useRouter();
  const routeData = router.query;
  console.log(routeData);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

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
    const docRef = doc(db, "posts", routeData.id);
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
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllComments(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);

  //time

  return (
    <section>
      <Message {...routeData}></Message>
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
            className="bg-cyan-800 rounded-r-lg hover:bg-cyan-600 p-2 text-sm"
          >
            Submit
          </button>
        </form>
        {router.isReady ? (
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
          <p className="py-10 text-center">Loading comments...</p>
        )}
      </div>
    </section>
  );
}
