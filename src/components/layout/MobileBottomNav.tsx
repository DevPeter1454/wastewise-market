import { NavLink } from "react-router-dom";
import Icon from "../shared/Icon";

const navItems = [
  { to: "/", icon: "home", label: "Home" },
  { to: "/sell", icon: "add_circle", label: "Sell" },
  { to: "/recyclables", icon: "recycling", label: "Recycle" },
  { to: "/guide", icon: "delete_sweep", label: "Guide" },
  { to: "/cleaning", icon: "cleaning_services", label: "Clean" },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 bg-white/70 backdrop-blur-md flex justify-around items-center px-4 pb-4 z-50 rounded-t-xl shadow-[0px_-10px_40px_rgba(19,27,46,0.05)]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-5 py-2 transition-all active:scale-90 duration-150 ${
              isActive
                ? "bg-green-100 text-green-800 rounded-full"
                : "text-slate-500 hover:text-green-600"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={item.icon} filled={isActive} className="mb-1" />
              <span className="font-body text-[10px] font-semibold uppercase tracking-widest">
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
