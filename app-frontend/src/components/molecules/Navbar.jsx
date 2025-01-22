import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Boy from "../../assets/Images/depression.png";
import CustomDropdown from "./DropDown";
import useStore from "@/useStore";
function Navbar() {
  const nav = useNavigate();
  const isAdmin = useStore((state) => state.isAdmin);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const goTo = (route) => {
    nav(route);
  };

  // const StyledBadge = styled(Badge)(({ theme }) => ({
  //   "& .MuiBadge-badge": {
  //     right: -3,
  //     top: 13,
  //     border: `2px solid ${theme.palette.background.paper}`,
  //     padding: "0 4px",
  //   },
  // }));

  return (
    <nav className="sticky top-0 bg-[#1B5F7C] max-w-full min-w-full text-white h-16 flex justify-between items-center z-50 p-4">
      <div className="logo text-3xl ml-0 lg:ml-5">
        <span
          className="font-extrabold text-5xl bg-gradient-to-r from-blue-200 via-blue-400 to-teal-300 text-transparent bg-clip-text tracking-wide"
          style={{
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.1em",
            textShadow:
              "1px 1px 3px rgba(0, 0, 0, 0.1), 0px 0px 6px rgba(0, 200, 255, 0.15)",
            padding: "4px 12px",
            borderRadius: "6px",
            animation: "gentleGlow 6s ease-in-out infinite",
            transition: "all 0.3s ease-in-out",
          }}
        >
          EUNOIA
        </span>

        <style jsx>{`
          @keyframes gentleGlow {
            0%,
            100% {
              text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1),
                0px 0px 8px rgba(100, 200, 255, 0.2),
                0px 0px 15px rgba(150, 220, 255, 0.15);
            }
            50% {
              text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.12),
                0px 0px 12px rgba(100, 200, 255, 0.3),
                0px 0px 20px rgba(150, 220, 255, 0.25);
            }
          }
        `}</style>
      </div>

      {/* Menu Icon for Mobile */}
      <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
        {isOpen ? (
          <CloseIcon fontSize="large" />
        ) : (
          <MenuIcon fontSize="large" />
        )}
      </div>

      {/* Navigation Links for Desktop */}
      <div className="hidden lg:flex flex-row items-center w-1/2 justify-between">
        <NavLink
          className="navLink no-underline text-white font-semibold text-xl"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="navLink no-underline text-white font-semibold text-xl"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className="navLink no-underline text-white font-semibold text-xl"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/therapist"
        >
          Therapists
        </NavLink>

        <NavLink
          className="navLink no-underline text-white font-semibold text-xl"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/articles"
        >
          Articles
        </NavLink>

        {/* {!isLogin && ( */}
        <div
          // onClick={toggleDropDown}
          className="text-xl lg:text-2xl"
        >
          <CustomDropdown
            table={[
              { option: "SignUp / Login", action: () => goTo("/login") },
              {
                option: "User Dashboard",
                action: () => goTo("/dashboard"),
              },
              {
                option: "Admin Dashboard",
                action: () => goTo("/admin"),
              },
            ]}
          />
        </div>
        {/* )} */}
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col lg:hidden items-center bg-[#1B5F7C] absolute top-16 left-0 w-full transition-transform duration-300 ease-in-out`}
      >
        <NavLink
          className="navLink no-underline text-white font-semibold text-lg py-2 w-full text-center border-b border-gray-600"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/"
          onClick={toggleMenu}
        >
          Home
        </NavLink>
        <NavLink
          className="navLink no-underline text-white font-semibold text-lg py-2 w-full text-center border-b border-gray-600"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/about"
          onClick={toggleMenu}
        >
          About
        </NavLink>
        <NavLink
          className="navLink no-underline text-white font-semibold text-lg py-2 w-full text-center border-b border-gray-600"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/therapist"
          onClick={toggleMenu}
        >
          Therapists
        </NavLink>

        <NavLink
          className="navLink no-underline text-white font-semibold text-xl"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/articles"
        >
          Articles
        </NavLink>

        {/* Mobile Menu Icons */}
        <div
          className="navLink no-underline flex justify-center text-xl py-2 w-full text-center border-b border-gray-600"
          onClick={toggleMenu}
        >
          <CustomDropdown
            table={[
              { option: "SignUp / Login", action: () => goTo("/login") },
              { option: "User Dashboard", action: () => goTo("/dashboard") },
              { option: "Admin Dashboard", action: () => goTo("/admin") },
            ]}
          />
        </div>
        {/* )} */}
      </div>
    </nav>
  );
}

export default Navbar;
