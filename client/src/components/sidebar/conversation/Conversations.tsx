import { useConversation } from "../../../hooks/useConversation";
import CoversationItem from "./ConversationItem";
import { User } from "../../../types/types";

import { useDispatch, useSelector } from "react-redux";
import { sidebarUsersActions } from "../../../redux/sidebarUsersSlice";

const Conversations = () => {
  const {
    sidebarUsers: { users },
  } = useSelector((state) => state) as {
    sidebarUsers: { users: [] };
  };

  const dispatch = useDispatch();
  const { isLoading } = useConversation("/api/users", {
    onSuccess(data) {
      dispatch(sidebarUsersActions.setSidebarUsers(data));
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
