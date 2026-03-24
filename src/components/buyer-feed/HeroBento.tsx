import Icon from "../shared/Icon";

export default function HeroBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Impact Summary Card */}
      <div className="md:col-span-2 bg-gradient-to-br from-primary to-primary-container p-8 rounded-xl text-white flex flex-col justify-between relative overflow-hidden shadow-sm">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Icon name="bolt" filled className="text-sm" />
            Live Impact Stats
          </div>
          <h3 className="text-5xl font-black mb-2">240 Kilograms</h3>
          <p className="text-primary-fixed font-medium text-lg">
            Waste Saved Today in Lagos Region
          </p>
        </div>
        <div className="mt-8 relative z-10 flex items-center gap-4">
          <div className="h-3 flex-grow bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary-fixed w-3/4"></div>
          </div>
          <span className="font-bold text-sm">75% of Daily Goal</span>
        </div>
        {/* Decorative element */}
        <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] opacity-10 rotate-12">
          eco
        </span>
      </div>

      {/* Featured Category Card */}
      <div className="bg-tertiary-fixed p-8 rounded-xl flex flex-col justify-between shadow-sm group">
        <div>
          <h4 className="text-on-tertiary-fixed text-2xl font-bold mb-2">
            Direct From Plateau
          </h4>
          <p className="text-on-tertiary-fixed-variant text-sm">
            The freshest Irish Potatoes and Bell Peppers just arrived at 40%
            discount.
          </p>
        </div>
        <button className="mt-6 flex items-center gap-2 text-on-tertiary-fixed font-bold text-sm group-hover:translate-x-2 transition-transform">
          Browse Region
          <Icon name="arrow_forward" />
        </button>
      </div>
    </div>
  );
}
