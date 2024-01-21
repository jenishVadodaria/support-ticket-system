/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import headerLogo from "../../assets/undraw_pic_profile_header_logo.svg";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState<boolean>(false);

  const navItems = [
    { name: "Tickets", path: "/tickets" },
    { name: "Agents", path: "/agents" },
  ];
  return (
    <header className="my-8 flex flex-wrap items-center justify-between">
      <Link to="/">
        <img
          src={headerLogo}
          className="w-8 object-contain md:w-12"
          alt="Header Logo"
        />
      </Link>
      <div className="lg:hidden">
        <button
          onClick={() => setShowHamburgerMenu(true)}
          className="navbar-burger flex items-center p-3 text-black"
        >
          <GiHamburgerMenu size={20} />
        </button>
      </div>
      <div className="hidden items-center gap-4 lg:flex lg:gap-8">
        {navItems.map((item) => (
          <div key={item.name}>
            <Link
              className="relative rounded-lg px-4 py-2 text-white shadow-lg transition duration-200 hover:shadow-primary-hover hover:underline bg-[#FF5A00]"
              to={item.path}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
      {showHamburgerMenu && (
        <HamburgerMenu
          navItems={navItems}
          showHamburgerMenu={showHamburgerMenu}
          setShowHamburgerMenu={setShowHamburgerMenu}
        />
      )}
    </header>
  );
};

export default Header;
