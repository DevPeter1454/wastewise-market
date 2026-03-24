import { NavLink } from "react-router-dom";
import Icon from "../shared/Icon";

const navItems = [
  { to: "/", icon: "storefront", label: "Marketplace" },
  { to: "/guide", icon: "delete_outline", label: "AI Disposal Guide" },
  { to: "/sell", icon: "add_circle", label: "Sell Item" },
  { to: "/recyclables", icon: "recycling", label: "Buy Recyclables" },
  { to: "/cleaning", icon: "eco", label: "Cleaning Day" },
];

export default function DesktopSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-50 flex flex-col py-6 gap-y-2 z-[60]">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
          <Icon name="eco" />
        </div>
        <div>
          <h1 className="text-xl font-black text-green-800 tracking-tight">
            WasteWise
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            Market Platform
          </p>
        </div>
      </div>

      <nav className="flex-grow space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `mx-2 px-4 py-3 rounded-full flex items-center gap-3 hover:translate-x-1 transition-transform duration-200 text-sm font-medium ${
                isActive
                  ? "bg-green-100 text-green-800"
                  : "text-slate-600 hover:bg-slate-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={item.icon} filled={isActive} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 mt-auto mb-6">
        <NavLink
          to="/sell"
          className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 rounded-full font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Icon name="add" className="text-sm" />
          <span>New Listing</span>
        </NavLink>
      </div>

      <div className="border-t border-slate-200/50 pt-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `mx-2 px-4 py-2 rounded-full flex items-center gap-3 text-xs cursor-pointer ${
              isActive
                ? "bg-green-100 text-green-800"
                : "text-slate-600 hover:bg-slate-200"
            }`
          }
        >
          <Icon name="settings" className="text-lg" />
          Settings
        </NavLink>
        <a className="text-slate-600 mx-2 px-4 py-2 hover:bg-slate-200 rounded-full flex items-center gap-3 text-xs cursor-pointer">
          <Icon name="help" className="text-lg" />
          Help Center
        </a>
      </div>
    </aside>
  );
}
