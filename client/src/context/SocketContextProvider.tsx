import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { InitialState } from "../redux/userSlice";

const SocketContext = createContext<any>({});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    user: { user },
  } = useSelector((state) => state) as { user: InitialState };
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const state: any = useSelector((state) => state);

  useEffect(() => {
    if (user) {
      const newSocket = io("https://chatify-2i0o.onrender.com", {
        query: {
          userId: state.user.user._id,
        },
      });

      setSocket(newSocket);

      newSocket?.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
    } else {
      socket?.close();
      setSocket(null);
    }
  }, [state.user.user]);

  return (
    <SocketContext.Provider value={{ onlineUsers, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
