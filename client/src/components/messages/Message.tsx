import { useSelector } from "react-redux";
import { MessageType } from "../../types/types";
import { InitialState } from "../../redux/userSlice";
import { useSelectConversation } from "../../zustand/useSelectConversation";

const Message = ({ message }: { message: MessageType }) => {
  const {
    user: { user },
  } = useSelector((state) => state) as { user: InitialState };

  const state = useSelectConversation();
  const isSender = message.senderId === user?._id;
  let avatarUrl;
  if (isSender) avatarUrl = user.avatar;
  else {
    avatarUrl = state.conversation?.avatar;
  }

  const time = new Date(message.createdAt).toLocaleString("USD", {
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    month: "short",
  });

  return (
    <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatarUrl || "/bg.jpg"} alt="avatar" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${
          isSender ? "bg-blue-600/80" : "bg-slate-600/80"
        } `}
      >
        {message.message}
      </div>
      <div className="chat-footer text-white/40  text-xs flex gap-1 items-center">
        {time}
      </div>
    </div>
  );
};
export default Message;
