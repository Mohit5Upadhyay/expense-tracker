import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

function Navbar({ activeMenu, openSideMenu, setOpenSideMenu }) {
  // const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 shadow-md bg-slate-50/80 backdrop-blur-[5px] z-[1000]">
      <div className="flex gap-5 bg-white border border-gray-200/5 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-50">
        <button
          className="block lg:hidden text-slate-600"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-3xl font-semibold" />
          ) : (
            <HiOutlineMenu className="text-3xl font-semibold" />
          )}
        </button>

        <h2 className="text-[1.7rem]  font-semibold text-rose-700">
          Expense Tracker..
        </h2>

        {/* {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-green-700 lg:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )} */}
      </div>
    </nav>
  );
}

export default Navbar;
