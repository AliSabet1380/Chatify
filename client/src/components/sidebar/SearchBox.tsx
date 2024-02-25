import { BiSearch } from "react-icons/bi";

const SearchBox = () => {
  return (
    <form className="flex gap-2 justify-center items-center bg-gray-800 px-2 rounded-lg ">
      <input
        className="bg-transparent px-4 py-2 w-full focus:outline-none focus:border-none placeholder:text-gray-400 text-white"
        placeholder="Search..."
      />
      <button>
        <BiSearch className="w-5 h-5" />
      </button>
    </form>
  );
};
export default SearchBox;
