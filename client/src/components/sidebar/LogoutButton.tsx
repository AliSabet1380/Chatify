import { useDispatch } from "react-redux";
import { userAction } from "../../redux/userSlice";
import { BiLogOut } from "react-icons/bi";
import { useAction } from "../../hooks/useAction";
import { toast } from "sonner";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { excute, isLoading } = useAction("/api/auth/logout", {
    onSuccess() {
      dispatch(userAction.loggedOutUser());
      toast.success("user logged out successfully");
    },
    onError(error) {
      toast.error(error);
    },
  });
  const onClick = async () => {
    excute({ mode: "logout", data: null });
  };

  return (
    <div className="fixed left-2 bottom-2 border border-black/10 rounded-md">
      <button
        disabled={isLoading}
        onClick={onClick}
        className="btn btn-ghost btn-block  btn-sm text-black/70"
      >
        {isLoading ? (
          <span className="loading loading-spinner text-white/70" />
        ) : (
          <BiLogOut className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
export default LogoutButton;
