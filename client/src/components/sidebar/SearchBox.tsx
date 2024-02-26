import { ElementRef, FormEvent, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { toast } from "sonner";
import { useSelectConversation } from "../../zustand/useSelectConversation";
import { useSelector } from "react-redux";
import { User } from "../../types/types";

const SearchBox = () => {
  const searchInputRef = useRef<ElementRef<"input">>(null);
  const { setConversation } = useSelectConversation();
  const {
    sidebarUsers: { users },
  } = useSelector((state) => state) as {
    sidebarUsers: { users: { username: string }[] };
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchTerm = searchInputRef.current?.value;
    if (!searchTerm || searchTerm.trim().length <= 2)
      return toast.error(`Too Short username: "${searchTerm}"`);

    const conversation = users.find((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) as User;
    if (!conversation) return toast.error("No such Conversation found");

    setConversation(conversation);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2 justify-center items-center bg-gray-800 px-2 rounded-lg "
    >
      <input
        ref={searchInputRef}
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
