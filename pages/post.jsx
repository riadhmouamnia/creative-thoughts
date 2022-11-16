import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function post() {
  const [post, setPost] = useState({ description: "", title: "" });

  //submit post
  const submitPost = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col mx-w-md mx-auto lg:justify-around lg:flex-row lg:items-center gap-6 justify-center border-gray-800 border-solid border-2 my-16 p-10 rounded-lg">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        Create a new <br className="hidden lg:flex" />
        <span className="text-cyan-800">post</span>
      </h1>
      <form onSubmit={submitPost} className="flex flex-col justify-center">
        <label className="font-medium py-2 text-white " htmlFor="title">
          Title:
        </label>
        <input
          className="bg-gray-900 font-medium text-white rounded-lg py-2 px-4"
          type="text"
          placeholder="title"
          required
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <label className="font-medium py-2 text-white" htmlFor="description">
          Description:
        </label>
        <textarea
          className="h-48 w-full font-medium py-2 text-white bg-gray-900 rounded-lg p-4"
          name="description"
          id="description"
          required
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        ></textarea>
        <p
          className={`flex justify-end font-medium ${
            post.description.length > 300 ? "text-red-600" : "text-cyan-800"
          }`}
        >
          {post.description.length}/300
        </p>
        <button
          type="submit"
          className="flex align-middle text-lg text-center justify-center items-center bg-cyan-800 rounded-md hover:bg-cyan-600 font-medium my-6 p-4 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
