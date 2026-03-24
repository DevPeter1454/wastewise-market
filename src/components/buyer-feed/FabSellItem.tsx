import { Link } from "react-router-dom";
import Icon from "../shared/Icon";

export default function FabSellItem() {
  return (
    <Link
      to="/sell"
      className="fixed bottom-24 right-6 bg-tertiary-container text-on-tertiary-container flex items-center gap-2 pl-4 pr-6 py-4 rounded-full shadow-2xl active:scale-90 transition-transform z-40 lg:hidden"
    >
      <Icon name="add_circle" />
      <span className="font-headline font-bold text-sm">Sell Item</span>
    </Link>
  );
}
