import { useState, useCallback } from "react";
import Icon from "../components/shared/Icon";
import Toast from "../components/shared/Toast";
import HeroBento from "../components/buyer-feed/HeroBento";
import ProductGrid from "../components/buyer-feed/ProductGrid";
import FabSellItem from "../components/buyer-feed/FabSellItem";
import { useListings } from "../hooks/useListings";
import type { Listing } from "../types";

const CATEGORIES = ["All", "Vegetables", "Fruits", "Grains", "Dairy"];

export default function BuyerFeedPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState("check_circle");
  const { listings, loading } = useListings(activeCategory);
  const hideToast = useCallback(() => setToastVisible(false), []);

  const handleBid = useCallback((listing: Listing) => {
    setToastIcon("gavel");
    setToastMessage(`Bid placed on ${listing.title} at ₦${listing.discountPrice.toLocaleString()}`);
    setToastVisible(true);
  }, []);

  const handleBuy = useCallback((listing: Listing) => {
    setToastIcon("shopping_bag");
    setToastMessage(`${listing.title} purchased for ₦${listing.discountPrice.toLocaleString()}!`);
    setToastVisible(true);
  }, []);

  const filteredListings = searchQuery
    ? listings.filter((l) => {
        const q = searchQuery.toLowerCase();
        return (
          l.title.toLowerCase().includes(q) ||
          l.vendorName.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q)
        );
      })
    : listings;

  return (
    <div className="space-y-6 lg:space-y-10">
      {/* Desktop header */}
      <div className="hidden lg:flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
            Marketplace Feed
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Discover surplus fresh produce from local Nigerian farms and help
            reduce food waste today.
          </p>
        </div>
        <div className="relative w-full md:w-[400px]">
          <input
            className="w-full bg-surface-container-highest border-none rounded-[1rem] py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
            placeholder="Search tomatoes, peppers, yams..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Icon
            name="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
        </div>
      </div>

      {/* Mobile search */}
      <section className="mt-4 lg:hidden">
        <div className="relative flex items-center">
          <Icon
            name="search"
            className="absolute left-4 text-outline"
          />
          <input
            className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border-none rounded-[1rem] focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
            placeholder="Search tomatoes, peppers..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Mobile filter chips */}
      <nav className="flex overflow-x-auto no-scrollbar gap-3 -mx-4 px-4 py-2 lg:hidden">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-label font-semibold text-sm whitespace-nowrap active:scale-95 transition-transform ${
              activeCategory === cat
                ? "bg-primary text-on-primary"
                : "bg-surface-container-low text-on-surface-variant"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Mobile impact stat */}
      <div className="lg:hidden bg-primary-container/10 border-2 border-dashed border-primary-container/30 rounded-xl p-6 flex items-center gap-4">
        <div className="bg-primary text-on-primary h-14 w-14 rounded-full flex items-center justify-center shrink-0">
          <Icon name="recycling" className="text-3xl" />
        </div>
        <div className="flex-1">
          <h4 className="font-headline font-bold text-on-surface-variant">
            Waste Saved Today
          </h4>
          <p className="text-2xl font-extrabold text-primary tracking-tighter">
            240 Kilograms
          </p>
          <div className="w-full bg-primary-fixed h-1.5 rounded-full mt-2">
            <div className="bg-primary h-full rounded-full w-[75%]"></div>
          </div>
        </div>
      </div>

      {/* Desktop bento highlights */}
      <div className="hidden lg:block">
        <HeroBento />
      </div>

      {/* Product grid */}
      <ProductGrid
        listings={filteredListings}
        loading={loading}
        onBid={handleBid}
        onBuy={handleBuy}
      />

      {/* Mobile FAB */}
      <FabSellItem />

      <Toast
        message={toastMessage}
        icon={toastIcon}
        visible={toastVisible}
        onClose={hideToast}
      />
    </div>
  );
}
