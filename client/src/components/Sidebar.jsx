import { Link } from "react-router-dom";
import { SIDEBAR_MENU_OPTIONS } from "../utils/constant";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";

const Sidebar = function () {
  const [selectedMenu, setSelectedMenu] = useState("/dashboard");
  return (
    <>
      <div className="sidebar border-blue-300 border-4 h-[100vh]">
        <ul className="sidebar-options">
          {SIDEBAR_MENU_OPTIONS.map((item) => (
            <li
              className={`option py-4 px-6 border-b-2 text-[#141824a6] text-[16px] pl-[2.5em] hover:bg-[#d1d1d1e6] ${selectedMenu === item.path ? "bg-[#d1d1d1e6]" : ""}`}
              onClick={() => {
                setSelectedMenu(item.path);
              }}
              key={item.path}
            >
              <Link className="flex" to={item.path}>
                <FeatherIcon
                  icon={item.icon}
                  size="16"
                  className="mt-[0.2rem] mr-[0.5rem]"
                />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
