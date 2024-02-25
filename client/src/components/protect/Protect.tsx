import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { InitialState } from "../../redux/userSlice";

export const ProtectAuthorized = () => {
  const {
    user: { user },
  } = useSelector((state) => state) as { user: InitialState };

  return user ? <Outlet /> : <Navigate to={"/"} />;
};

export const ProtectUnauthorized = () => {
  const {
    user: { user },
  } = useSelector((state) => state) as { user: InitialState };

  return !user ? <Outlet /> : <Navigate to={"/home"} />;
};
