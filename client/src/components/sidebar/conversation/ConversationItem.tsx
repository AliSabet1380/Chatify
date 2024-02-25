import { useSocketContext } from "../../../context/SocketContextProvider";
import { useSelectConversation } from "../../../zustand/useSelectConversation";

interface CoversationItemProps {
  username: string;
  id: string;
  fullName: string;
  avatar: string;
}

const CoversationItem = ({
  id,
  avatar,
  fullName,
  username,
}: CoversationItemProps) => {
  const state = useSelectConversation();
  const { onlineUsers } = useSocketContext() as { onlineUsers: any[] };

  const isOnline = onlineUsers.find((userId) => userId === id);

  return (
    <div
      onClick={() =>
        state.setConversation({ fullName, username, _id: id, avatar })
      }
      className={`flex items-center gap-4 py-1 rounded-md w-full px-2 hover:bg-gray-800/10  hover:cursor-pointer  ${
        state.conversation?._id === id && "bg-gray-800/10"
      }`}
    >
      <div className={`avatar  w-11 h-11 ${isOnline ? "online" : ""}`}>
        <div className="rounded-full">
          <img src={avatar} className="" />
        </div>
      </div>
      <p className="text-white font-medium text-sm">{username}</p>
    </div>
  );
};
export default CoversationItem;
