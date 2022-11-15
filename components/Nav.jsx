import Link from "next/link";

export default function Nav() {
  return (
    <div>
      <nav className="flex justify-between items-center py-10">
        <Link href={"/"}>
          <button className="text-lg font-bold cursor-pointer hover:text-cyan-800">
            Creative Thoughts.
          </button>
        </Link>
        <ul className="flex items-center gap-10">
          <Link href={"/auth/login"}>
            <button className="py-2 px-4 text-sm bg-cyan-800 text-white rounded-md font-medium ml-8 cursor-pointer hover:bg-cyan-600">
              Join Now
            </button>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
