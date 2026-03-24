import { Link } from "react-router-dom";
import Icon from "../shared/Icon";

export default function MobileTopBar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm shadow-black/5 flex items-center justify-between px-6 h-16">
      <div className="flex items-center gap-2">
        <Icon name="eco" className="text-green-700" />
        <h1 className="font-headline font-bold text-lg tracking-tight text-green-700">
          WasteWise Market
        </h1>
      </div>
      <Link to="/settings" className="flex items-center">
        <Icon name="account_circle" className="text-slate-500" />
      </Link>
    </header>
  );
}
