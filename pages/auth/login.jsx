// import { HiOutlineMail } from "react-icons/hi";
// import { AiOutlineUser } from "react-icons/ai";
// import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  //sign in with google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("Login");
    }
  }, [user]);

  return (
    <div className="border-gray-800 border-solid border-2 my-16 p-10 rounded-lg">
      <h2 className="text-2xl font-bold">Join today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        {/* form for sign in with email and  password */}
        {/* <form className="flex flex-col gap-1 py-6">
          <label className="text-sm flex gap-2 items-center" htmlFor="username">
            <AiOutlineUser /> Username:
          </label>
          <input
            className="py-4 px-2 my-4 rounded-md w-full"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <label className="text-sm flex gap-2 items-center" htmlFor="email">
            <HiOutlineMail /> Email:
          </label>
          <input
            className="py-4 px-2 my-4 rounded-md w-full"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
          />
          <label className="text-sm flex gap-2 items-center" htmlFor="password">
            <RiLockPasswordLine /> Password:
          </label>
          <input
            className="py-4 px-2 my-4 rounded-md w-full"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button className="flex align-middle bg-slate-800 rounded-md hover:bg-slate-600 font-medium mb-6 p-4 w-full">
            Sign up
          </button>
        </form> */}
        <button
          onClick={googleLogin}
          className="flex align-middle items-center gap-2 text-white bg-cyan-800 rounded-md hover:bg-cyan-600 font-medium p-4 w-full"
        >
          <FcGoogle className="text-2xl" /> Sign in with Google
        </button>
      </div>
    </div>
  );
}
