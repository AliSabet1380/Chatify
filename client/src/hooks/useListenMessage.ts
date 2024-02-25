import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../redux/messageSlice";
import { useSocketContext } from "../context/SocketContextProvider";

export const useListenMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const {
    messages: { messages },
  } = useSelector((state) => state) as { messages: any };

  useEffect(() => {
    socket?.on("newMessage", (newMessage: any) => {
      const allMessage = [...messages, newMessage];

      dispatch(messageActions.setMessages(allMessage));
    });
    return () => socket?.off("newMessage");
  }, [socket, dispatch, messages]);
};
