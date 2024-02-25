import { useSelector } from "react-redux";
import Header from "./Header";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { InitialState } from "../../redux/userSlice";
import { useSelectConversation } from "../../zustand/useSelectConversation";

export const MessageContainer = () => {
  const state = useSelectConversation();
  if (!state.conversation) return <MessageContainer.Skeleton />;

  return (
    <div className="md:min-w-[450px] border-l border-black/20  min-w-[250px] flex flex-col">
      <Header toUser={state.conversation.fullName} />
      <Messages />
      <SendMessage />
    </div>
  );
};

MessageContainer.Skeleton = () => {
  const {
    user: { user },
  } = useSelector((state) => state) as { user: InitialState };

  return (
    <div className="md:min-w-[450px] border-l border-black/20  min-w-[250px] flex flex-col justify-center items-center">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-300 font-medium flex flex-col items-center gap-2">
        <p>Welcome {user?.username}</p>
        <p className="text-sm">Select a chat to start messaging</p>
      </div>
    </div>
  );
};
