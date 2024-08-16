import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, []);
  return (
    <>
      <div className="border-1 grid grid-cols-[15%_85%]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
