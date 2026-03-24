import ProductCard from "./ProductCard";
import type { Listing } from "../../types";

interface ProductGridProps {
  listings: Listing[];
  loading: boolean;
}

export default function ProductGrid({ listings, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm animate-pulse"
          >
            <div className="h-48 lg:h-56 bg-surface-container-high" />
            <div className="p-6 space-y-4">
              <div className="h-5 bg-surface-container-high rounded w-3/4" />
              <div className="h-4 bg-surface-container-high rounded w-1/2" />
              <div className="h-6 bg-surface-container-high rounded w-1/3" />
              <div className="h-10 bg-surface-container-high rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-on-surface-variant text-lg">
          No listings found. Be the first to sell!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {listings.map((listing, index) => (
        <ProductCard
          key={listing.id}
          listing={listing}
          featured={index === 0}
        />
      ))}
    </div>
  );
}
