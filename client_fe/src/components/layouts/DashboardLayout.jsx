import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import Footer from "../footer/Footer";

function DashboardLayout({ children, activeMenu }) {
  const { user } = useContext(UserContext);

  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className=" flex flex-col  min-h-screen pt-[72px]">
      <Navbar
        activeMenu={activeMenu}
        openSideMenu={openSideMenu}
        setOpenSideMenu={setOpenSideMenu}
      />

      {user && (
        <div className="flex">
          {/* Desktop sidebar */}
          <div className="hidden lg:block bg-white z-[800] ">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Mobile sidebar */}
          <div
            className={`lg:hidden ${
              openSideMenu ? "block" : "hidden"
            } fixed inset-0 z-[800]`}
          >
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setOpenSideMenu(false)}
            />
            <div className="fixed left-0 top-[60px] h-full bg-white z-50">
              <SideMenu activeMenu={activeMenu} />
            </div>
          </div>

          <div className="grow mx-5 z-[600]">{children}</div>
        </div>
      )}


      {/* footer */}
      <Footer />
    </div>
  );
}

export default DashboardLayout;

// {user && (
//   <div className="flex">
//     {/* desktop sidebar */}
//     <div className="hidden max-[900px]:hidden min-[901px]:block bg-pink-200">
//       <SideMenu activeMenu={activeMenu} />
//     </div>

//     {/* mobile side bar */}
//     {openSideMenu && (
//       // <div className="fixed top-[61px] -ml-4 bg-green-700 lg:hidden">
//       //   <SideMenu activeMenu={activeMenu} />
//       // </div>

//       <div className="fixed inset-0 z-40">
//         <div
//           className="fixed inset-0 bg-black/50"
//           onClick={() => setOpenSideMenu(false)}
//         />
//         <div className="fixed left-0 top-[60px] h-full bg-white z-50">
//           <SideMenu activeMenu={activeMenu} />
//         </div>
//       </div>
//     )}

//     <div className="grow mx-5"> {children} </div>
//   </div>
// )}
