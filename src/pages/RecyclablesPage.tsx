import { useState, useCallback } from "react";
import Icon from "../components/shared/Icon";
import Toast from "../components/shared/Toast";

interface Recyclable {
  id: string;
  title: string;
  seller: string;
  location: string;
  material: string;
  pricePerKg: number;
  minOrder: string;
  imageIcon: string;
  available: boolean;
  co2SavedPerKg: number;
}

const MATERIALS = ["All", "Plastic", "Metal", "Glass", "Organic", "Paper"];

const SAMPLE_RECYCLABLES: Recyclable[] = [
  {
    id: "r1",
    title: "Crushed PET Bottles",
    seller: "Mai-Bola Recycling Hub",
    location: "Dugbe, Ibadan",
    material: "Plastic",
    pricePerKg: 350,
    minOrder: "50 kg",
    imageIcon: "water_bottle",
    available: true,
    co2SavedPerKg: 1.5,
  },
  {
    id: "r2",
    title: "Sorted Aluminium Cans",
    seller: "Iya Basira Scrap Yard",
    location: "Ojota, Ibadan",
    material: "Metal",
    pricePerKg: 800,
    minOrder: "20 kg",
    imageIcon: "takeout_dining",
    available: true,
    co2SavedPerKg: 9.0,
  },
  {
    id: "r3",
    title: "Clean Glass Bottles",
    seller: "GreenCycle Bodija",
    location: "Bodija, Ibadan",
    material: "Glass",
    pricePerKg: 120,
    minOrder: "100 kg",
    imageIcon: "liquor",
    available: true,
    co2SavedPerKg: 0.3,
  },
  {
    id: "r4",
    title: "Compost Manure (Ready)",
    seller: "Baba Agric Composting",
    location: "Agodi, Ibadan",
    material: "Organic",
    pricePerKg: 200,
    minOrder: "25 kg",
    imageIcon: "compost",
    available: true,
    co2SavedPerKg: 0.5,
  },
  {
    id: "r5",
    title: "Shredded Pure Water Sachets",
    seller: "Wecyclers Oyo State",
    location: "Mokola, Ibadan",
    material: "Plastic",
    pricePerKg: 250,
    minOrder: "30 kg",
    imageIcon: "recycling",
    available: true,
    co2SavedPerKg: 1.2,
  },
  {
    id: "r6",
    title: "Cardboard Bales",
    seller: "Pakam Collectors",
    location: "Ogbomoso, Oyo State",
    material: "Paper",
    pricePerKg: 180,
    minOrder: "100 kg",
    imageIcon: "inventory_2",
    available: false,
    co2SavedPerKg: 0.9,
  },
  {
    id: "r7",
    title: "Scrap Iron & Steel",
    seller: "Owode Metal Market Oyo",
    location: "Oyo Town, Oyo State",
    material: "Metal",
    pricePerKg: 450,
    minOrder: "50 kg",
    imageIcon: "settings",
    available: true,
    co2SavedPerKg: 1.8,
  },
  {
    id: "r8",
    title: "Palm Kernel Shell",
    seller: "Mama Eco Farms",
    location: "Iseyin, Oyo State",
    material: "Organic",
    pricePerKg: 150,
    minOrder: "200 kg",
    imageIcon: "energy_savings_leaf",
    available: true,
    co2SavedPerKg: 0.4,
  },
];

export default function RecyclablesPage() {
  const [activeMaterial, setActiveMaterial] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState("check_circle");
  const hideToast = useCallback(() => setToastVisible(false), []);

  const filtered = SAMPLE_RECYCLABLES.filter((r) => {
    if (activeMaterial !== "All" && r.material !== activeMaterial) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.seller.toLowerCase().includes(q) ||
        r.material.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleContact = useCallback((item: Recyclable) => {
    setToastIcon("call");
    setToastMessage(`Contacting ${item.seller} about ${item.title}...`);
    setToastVisible(true);
  }, []);

  const handleOrder = useCallback((item: Recyclable) => {
    setToastIcon("shopping_cart");
    setToastMessage(
      `Order request sent for ${item.title} at ₦${item.pricePerKg}/kg!`
    );
    setToastVisible(true);
  }, []);

  const totalCO2 = SAMPLE_RECYCLABLES.reduce(
    (sum, r) => sum + r.co2SavedPerKg,
    0
  );

  return (
    <div className="space-y-6 lg:space-y-10">
      {/* Header */}
      <header className="space-y-2 lg:flex lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface">
            Buy Recyclables
          </h1>
          <p className="text-on-surface-variant mt-1 max-w-xl">
            Buy sorted, cleaned recyclable materials from verified Oyo State
            collectors. Turn waste into raw materials for your business.
          </p>
        </div>
        <div className="hidden lg:block relative w-[360px]">
          <input
            className="w-full bg-surface-container-highest border-none rounded-[1rem] py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
            placeholder="Search recyclables..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Icon
            name="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
        </div>
      </header>

      {/* Mobile search */}
      <section className="lg:hidden">
        <div className="relative flex items-center">
          <Icon name="search" className="absolute left-4 text-outline" />
          <input
            className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border-none rounded-[1rem] focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
            placeholder="Search plastic, metal, glass..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Impact banner */}
      <div className="bg-primary-container/10 border-2 border-dashed border-primary-container/30 rounded-xl p-5 flex items-center gap-4">
        <div className="bg-primary text-on-primary h-14 w-14 rounded-full flex items-center justify-center shrink-0">
          <Icon name="eco" className="text-3xl" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-on-surface-variant text-sm">
            Environmental Impact
          </h4>
          <p className="text-xl font-extrabold text-primary tracking-tight">
            {totalCO2.toFixed(1)} kg CO₂ saved per kg bought
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Every purchase reduces landfill waste across Oyo State markets
          </p>
        </div>
      </div>

      {/* Material filter chips */}
      <nav className="flex overflow-x-auto no-scrollbar gap-3 -mx-4 px-4 py-1">
        {MATERIALS.map((mat) => (
          <button
            key={mat}
            onClick={() => setActiveMaterial(mat)}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap active:scale-95 transition-transform ${
              activeMaterial === mat
                ? "bg-primary text-on-primary"
                : "bg-surface-container-low text-on-surface-variant"
            }`}
          >
            {mat}
          </button>
        ))}
      </nav>

      {/* Recyclables grid */}
      {filtered.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl p-10 text-center">
          <Icon
            name="search_off"
            className="text-5xl text-on-surface-variant/30 mb-3"
          />
          <p className="text-on-surface-variant font-medium">
            No recyclables found
          </p>
          <p className="text-sm text-on-surface-variant/70 mt-1">
            Try a different search or material filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(19,27,46,0.04)] overflow-hidden flex flex-col"
            >
              {/* Icon header */}
              <div
                className={`h-36 flex items-center justify-center relative ${
                  item.available ? "bg-primary/5" : "bg-on-surface-variant/5"
                }`}
              >
                <Icon
                  name={item.imageIcon}
                  filled
                  className={`text-[56px] ${
                    item.available
                      ? "text-primary/40"
                      : "text-on-surface-variant/20"
                  }`}
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold uppercase text-on-surface-variant">
                    {item.material}
                  </span>
                  {!item.available && (
                    <span className="bg-error/10 text-error px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">
                      Sold Out
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-on-surface text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {item.seller}
                </p>
                <p className="text-[10px] text-on-surface-variant/60 mt-0.5 flex items-center gap-1">
                  <Icon name="location_on" className="text-xs" />
                  {item.location}
                </p>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-primary">
                      ₦{item.pricePerKg.toLocaleString()}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      /kg
                    </span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-full">
                    Min: {item.minOrder}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-2 text-[10px] text-primary font-bold">
                  <Icon name="eco" className="text-xs" />
                  Saves {item.co2SavedPerKg} kg CO₂ per kg
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleOrder(item)}
                    disabled={!item.available}
                    className="flex-1 bg-primary text-on-primary py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <Icon name="shopping_cart" className="text-sm" />
                    Order
                  </button>
                  <button
                    onClick={() => handleContact(item)}
                    disabled={!item.available}
                    className="px-4 py-2.5 bg-surface-container-high text-on-surface-variant rounded-full font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <Icon name="call" className="text-sm" />
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Toast
        message={toastMessage}
        icon={toastIcon}
        visible={toastVisible}
        onClose={hideToast}
      />
    </div>
  );
}
