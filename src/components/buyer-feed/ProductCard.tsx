import Icon from "../shared/Icon";
import type { Listing } from "../../types";

interface ProductCardProps {
  listing: Listing;
  featured?: boolean;
}

export default function ProductCard({
  listing,
  featured = false,
}: ProductCardProps) {
  return (
    <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_10px_40px_rgba(19,27,46,0.05)] flex flex-col group">
      <div
        className={`relative overflow-hidden ${featured ? "h-56" : "h-48 lg:h-56"}`}
      >
        <img
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={listing.imageUrl}
        />
        <div className="absolute top-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
          <Icon name="eco" filled className="text-sm" />-
          {listing.discountPercent}% OFF
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3
              className={`font-headline font-bold text-on-surface tracking-tight ${featured ? "text-xl" : "text-lg"}`}
            >
              {listing.title}
            </h3>
            <p className="text-on-surface-variant text-sm flex items-center gap-1 mt-1">
              <Icon name="storefront" className="text-sm" />
              {listing.vendorName}
            </p>
          </div>
          {!featured && (
            <button className="text-slate-300 hover:text-error transition-colors">
              <Icon name="favorite" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <span
            className={`font-black text-primary ${featured ? "text-2xl" : "text-xl"}`}
          >
            ₦{listing.discountPrice.toLocaleString()}
          </span>
          <span className="text-sm text-slate-400 line-through">
            ₦{listing.originalPrice.toLocaleString()}
          </span>
        </div>

        {featured ? (
          <div className="flex items-center gap-4 pt-2">
            <button className="flex-1 bg-gradient-to-br from-primary to-primary-container text-on-primary py-3.5 rounded-full font-headline font-bold text-sm tracking-wide shadow-md active:scale-95 transition-all">
              Buy Now
            </button>
            <button className="p-3.5 bg-secondary-container text-on-secondary-container rounded-full active:scale-95 transition-all">
              <Icon name="favorite" />
            </button>
          </div>
        ) : (
          <button className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-colors">
            Add to Bid
          </button>
        )}
      </div>
    </article>
  );
}
