import { ElementRef, FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { useAction } from "../hooks/useAction";
import { userAction } from "../redux/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const { excute, isLoading } = useAction("/api/auth/signup", {
    onSuccess(data: any) {
      dispatch(userAction.setUserLogin(data.data));
      toast.success(`user "${data.data.username}" created successfully`);
    },
    onError(error) {
      toast.error(error);
    },
  });
  const usernameInputRef = useRef<ElementRef<"input">>(null);
  const fullnameInputRef = useRef<ElementRef<"input">>(null);
  const passwordInputRef = useRef<ElementRef<"input">>(null);
  const passwordConfirmInputRef = useRef<ElementRef<"input">>(null);
  const genderInputRef = useRef<ElementRef<"select">>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const username = usernameInputRef.current?.value as string;
    const fullName = fullnameInputRef.current?.value as string;
    const password = passwordInputRef.current?.value as string;
    const passwordConfirm = passwordConfirmInputRef.current?.value as string;
    const gender = genderInputRef.current?.value as "male" | "female";
    if (!username || !fullName || !password || !passwordConfirm || !gender)
      return;

    excute({
      mode: "signup",
      data: {
        password,
        passwordConfirm,
        username,
        fullName,
        gender,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="w-full p-6 rounded-lg shadow-md text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-black/10">
        <h2 className="text-2xl text-center ">Sign Up</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="username" className="label px-2 pt-3">
              <span className="text-xs">username</span>
            </label>
            <input
              ref={usernameInputRef}
              type="text"
              id="username"
              className="input w-full h-10 input-border"
              placeholder="username"
            />
          </div>
          <div>
            <label htmlFor="fullname" className="label px-2 pt-3">
              <span className="text-xs">full name</span>
            </label>
            <input
              ref={fullnameInputRef}
              type="text"
              id="fullname"
              className="input w-full h-10 input-border"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label htmlFor="password" className="label px-2 pt-3">
              <span className="text-xs">password</span>
            </label>
            <input
              ref={passwordInputRef}
              type="text"
              id="password"
              className="input w-full h-10 input-border"
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="password_confirm" className="label px-2 pt-3">
              <span className="text-xs">password confirm</span>
            </label>
            <input
              ref={passwordConfirmInputRef}
              type="text"
              id="password_confirm"
              className="input w-full h-10 input-border"
              placeholder="Password Confirm"
            />
          </div>
          <div>
            <label htmlFor="gender" className="label px-2 pt-3">
              <span className="text-xs">Gender</span>
            </label>
            <select
              defaultValue={"male"}
              ref={genderInputRef}
              id="gender"
              className="select select-bordered w-full max-w-sm h-10"
            >
              <option value={"male"}>male</option>
              <option value={"female"}>female</option>
            </select>
          </div>
          <div className="mt-3">
            <Link
              to={"/"}
              className="hover:underline hover:text-blue-700 text-sm hover:cursor-pointer"
            >
              Have Account Already?
            </Link>
          </div>
          <button disabled={isLoading} className="btn btn-block btn-sm mt-4">
            {isLoading ? (
              <span className="loading loading-spinner text-white/70" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
