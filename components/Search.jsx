import { CiSearch } from "react-icons/ci";

export default function Search({ handleQueryPosts }) {
  return (
    <form className="flex justify-center py-4">
      <div className="flex gap-2 max-w-md w-full items-center bg-gray-800 px-2 rounded-lg">
        <CiSearch className="text-lg" />
        <input
          className="py-2 w-full bg-transparent outline-none "
          type="search"
          name="search"
          id="search"
          placeholder="Search posts"
          onChange={handleQueryPosts}
        />
      </div>
    </form>
  );
}
