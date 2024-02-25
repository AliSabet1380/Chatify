import Conversation from "./conversation/Conversations";
import LogoutButton from "./LogoutButton";
import SearchBox from "./SearchBox";

const Sidebar = () => {
  return (
    <div className="p-3">
      <SearchBox />
      <div className="divider px-1" />
      <Conversation />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
