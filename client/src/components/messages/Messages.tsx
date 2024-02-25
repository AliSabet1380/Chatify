import { ElementRef, useEffect, useRef } from "react";
import { toast } from "sonner";

import { useSelectConversation } from "../../zustand/useSelectConversation";
import { useGetMessage } from "../../hooks/useGetMessage";
import { MessageType } from "../../types/types";
import { MessageSkeleton } from "./MessageSkeleton";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../../redux/messageSlice";
import { useListenMessage } from "../../hooks/useListenMessage";

const Messages = () => {
  const messageBoxRef = useRef<ElementRef<"div">>(null);
  useListenMessage();
  const {
    messages: { messages },
  } = useSelector((state) => state) as { messages: any };

  const dispatch = useDispatch();
  const state = useSelectConversation();
  const { isLoading } = useGetMessage(
    `/api/messages/${state.conversation?._id}`,
    {
      onSuccess(data) {
        dispatch(messageActions.setMessages(data.messages));
      },
      onError(error) {
        toast.error(error);
      },
    }
  );

  useEffect(() => {
    setTimeout(() => {
      messageBoxRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    return () => state.setConversation(null);
  }, [state.setConversation]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {isLoading ? (
        <MessageSkeleton />
      ) : !isLoading && messages.length === 0 ? (
        <p className="text-center text-white/70 font-medium text-sm mt-4">
          send message to start conversation
        </p>
      ) : (
        messages?.map((message: MessageType) => (
          <div key={message._id} ref={messageBoxRef}>
            <Message message={message} />
          </div>
        ))
      )}
    </div>
  );
};
export default Messages;
