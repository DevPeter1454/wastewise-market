import { NavLink } from "react-router-dom";
import Icon from "../shared/Icon";

export default function DesktopTopBar() {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white/70 backdrop-blur-md z-50 flex justify-between items-center px-8 shadow-sm">
      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-headline text-sm antialiased transition-colors ${
                isActive
                  ? "text-green-700 font-bold border-b-2 border-green-700 pb-1"
                  : "text-slate-600 hover:text-green-600"
              }`
            }
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/guide"
            className={({ isActive }) =>
              `font-headline text-sm antialiased transition-colors ${
                isActive
                  ? "text-green-700 font-bold border-b-2 border-green-700 pb-1"
                  : "text-slate-600 hover:text-green-600"
              }`
            }
          >
            Disposal Guide
          </NavLink>
          <NavLink
            to="/cleaning"
            className={({ isActive }) =>
              `font-headline text-sm antialiased transition-colors ${
                isActive
                  ? "text-green-700 font-bold border-b-2 border-green-700 pb-1"
                  : "text-slate-600 hover:text-green-600"
              }`
            }
          >
            Cleaning Day
          </NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-600 hover:bg-green-50 rounded-lg transition-all active:scale-95">
          <Icon name="notifications" />
        </button>
        <button className="p-2 text-slate-600 hover:bg-green-50 rounded-lg transition-all active:scale-95">
          <Icon name="shopping_cart" />
        </button>
        <NavLink
          to="/sell"
          className="bg-primary text-white px-5 py-2 rounded-full font-bold text-sm active:scale-95 transition-all"
        >
          List Item
        </NavLink>
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
          <Icon name="person" />
        </div>
      </div>
    </header>
  );
}
