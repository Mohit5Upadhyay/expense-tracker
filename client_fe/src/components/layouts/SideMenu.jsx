import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../cards/CharAvatar";
import toast from "react-hot-toast";

function SideMenu({ activeMenu }) {
  const { user , clearUser } = useContext(UserContext);

  console.log("user: ", user);
  console.log("clearUser: ", clearUser);

  // Replace your existing console logs with this:
console.log("Complete user object:", JSON.stringify(user, null, 2));

  console.log("FullName: ", user?.fullName);
  console.log("Profile: ", user.profileImageUrl || "empty");
  console.log("email: ", user.email);
  console.log("_id: ", user._id);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      toast.success("Logout successfully!")
      return;
    }

    navigate(route);
  };


  console.log("Active Menu : ", activeMenu);
  console.log("User : ", user);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-60px)]  p-5 sticky top-[70px] z-50">
      <div className="flex flex-col items-center mt-3 gap-3 justify-center mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl}
            alt="profile image"
            className="w-20 h-20 rounded-full bg-slate-400"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl " // animate-bounce
          />
        )}

        <h5 className="text-gray-800 font-semibold leading-6 text-center animate-bounce">
          {(user?.fullName).toUpperCase() || ""}  {/* .toUpperCase() used here */}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        console.log("Side Menu Item : ", item , index , activeMenu),
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 border border-gray-500 text-[15px] ${
            activeMenu === item.label ? `text-red-700 font-semibold bg-red-100` : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-2xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default SideMenu;
