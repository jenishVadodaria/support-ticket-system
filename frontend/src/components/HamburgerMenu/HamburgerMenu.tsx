/* eslint-disable @typescript-eslint/no-unused-vars */
import { RxCross2 } from "react-icons/rx";

interface HamburgerMenuProps {
  navItems: { name: string; path: string }[];
  showHamburgerMenu: boolean;
  setShowHamburgerMenu: (showHamburgerMenu: boolean) => void;
}

const HamburgerMenu = ({
  navItems,
  showHamburgerMenu,
  setShowHamburgerMenu,
}: HamburgerMenuProps) => {
  const closeHamburgerMenu = () => {
    setShowHamburgerMenu(false);
  };

  return (
    showHamburgerMenu && (
      <div className="navbar-menu absolute z-50">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-50" />
        <nav className="fixed bottom-0 left-0 top-0 flex w-5/6 max-w-sm flex-col overflow-y-auto bg-neutral-900 px-6 py-6 dark:bg-neutral-100">
          <div className="mb-8 flex items-center justify-end">
            <button
              className="navbar-close h-6 w-6"
              onClick={closeHamburgerMenu}
            >
              <RxCross2 size={25} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ul className="space-y-6">
              {navItems.map((item: { name: string; path: string }) => (
                <li className="px-3" key={item.name}>
                  <a
                    className="default-transition text-skin-text-highlight decoration-transparent hover:underline hover:decoration-inherit"
                    href={item.path}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    )
  );
};

export default HamburgerMenu;
