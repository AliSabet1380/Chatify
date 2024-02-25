import { useState } from "react";
import { useConversation } from "../../../hooks/useConversation";
import CoversationItem from "./ConversationItem";
import { User } from "../../../types/types";

const Conversations = () => {
  const [users, setUsers] = useState([]);
  const { isLoading } = useConversation("/api/users", {
    onSuccess(data) {
      setUsers(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center mt-3 w-full ">
      {isLoading ? (
        <span className="loading loading-spinner text-white/70 mt-10" />
      ) : (
        users.map((user: User) => (
          <CoversationItem
            username={user.username}
            avatar={user.avatar}
            fullName={user.fullName}
            id={user._id}
            key={user._id}
          />
        ))
      )}
    </div>
  );
};
export default Conversations;
