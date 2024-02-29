import { Link } from "react-router-dom";
import { useRef, ElementRef, FormEvent } from "react";
import { toast } from "sonner";
// Redux
import { useDispatch } from "react-redux";

import { userAction } from "../redux/userSlice";
import { useAction } from "../hooks/useAction";

const Login = () => {
  const dispatch = useDispatch();

  const { excute, isLoading } = useAction("/api/auth/login", {
    onSuccess(data: any) {
      dispatch(userAction.setUserLogin(data.data));
      toast.success(`user "${data.data.username}" logged in successfully`);
    },
    onError(error) {
      toast.error(error);
    },
  });
  const usernameInputRef = useRef<ElementRef<"input">>(null);
  const passwordInputRef = useRef<ElementRef<"input">>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const username = usernameInputRef.current?.value as string;
    const password = passwordInputRef.current?.value as string;
    if (!username || !password) return;

    await excute({ mode: "login", data: { password, username } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg border border-black/10 shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-2xl font-semibold text-center text-gray-300">
          Login
        </h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="username" className="label px-2 pt-3">
              <span className="text-xs label-text">username</span>
            </label>
            <input
              ref={usernameInputRef}
              type="text"
              id="username"
              className="input p-2 w-full h-10 input-border"
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="password" className="label px-2 pt-3 ">
              <span className="text-xs label-text">password</span>
            </label>
            <input
              ref={passwordInputRef}
              type="password"
              id="password"
              className="input p-2 w-full h-10 input-border"
              placeholder="Password"
            />
          </div>
          <div className="mt-2">
            <Link
              to={"/signup"}
              className=" text-white hover:underline hover:text-blue-800 text-sm hover:cursor-pointer"
            >
              Dont have account?
            </Link>
          </div>
          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-square w-full mt-3 btn-sm p-2! "
            >
              {isLoading ? (
                <span className="loading loading-spinner text-white/70"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
