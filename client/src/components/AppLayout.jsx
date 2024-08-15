import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
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
