import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import {
  ProtectAuthorized,
  ProtectUnauthorized,
} from "./components/protect/Protect";

// App Component
const App = () => {
  return (
    <div className="flex items-center justify-center p-4 h-screen">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectAuthorized />}>
            <Route path="/home" Component={Home} />
          </Route>
          <Route element={<ProtectUnauthorized />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" Component={SignUp} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
