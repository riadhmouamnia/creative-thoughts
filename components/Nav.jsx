import Link from "next/link";

// this two comented import below
// make an error of Element type
// is invalid: expected a string (for built-in components) or
// a class/function (for composite components)
// so I had to lift the state of the user up one level
// and pass it as props

// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../utils/firebase";

export default function Nav({ user, loading }) {
  // const [user, loading] = useAuthState(auth);
  // console.log(user);

  return (
    <div>
      <nav className="flex justify-between items-center py-10">
        <Link href={"/"}>
          <button className="text-lg font-bold py-2 hover:text-cyan-800">
            Creative Thoughts.
          </button>
        </Link>
        <ul className="flex items-center gap-10">
          {!user && (
            <Link href={"/auth/login"}>
              <button className="py-2 px-4 text-sm bg-cyan-800 text-white rounded-md font-medium ml-8 hover:bg-cyan-600">
                Join Now
              </button>
            </Link>
          )}
          {user && (
            <div className="flex items-center gap-6">
              <Link href={"/post"}>
                <button className="py-2 px-4 text-sm bg-cyan-800 text-white rounded-md font-medium ml-8 hover:bg-cyan-600">
                  Post
                </button>
              </Link>
              <Link href={"/dashboard"}>
                <img
                  className="w-12 rounded-full"
                  src={user.photoURL}
                  alt={user.displayName}
                />
              </Link>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}
