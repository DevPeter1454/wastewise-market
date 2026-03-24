import { useState } from "react";
import Icon from "../components/shared/Icon";
import { useAIPricing } from "../hooks/useAIPricing";

const CATEGORIES = ["Vegetables", "Fruits", "Grains", "Dairy"];

export default function VendorListingPage() {
  const [formData, setFormData] = useState({
    title: "",
    vendorName: "",
    category: "Vegetables",
    quantity: "",
    originalPrice: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { result: aiResult, loading: aiLoading, getPricing } = useAIPricing();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGetAIPrice = () => {
    if (!formData.title || !formData.originalPrice) return;
    getPricing({
      itemName: formData.title,
      category: formData.category,
      quantity: formData.quantity,
      originalPrice: parseInt(formData.originalPrice),
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.vendorName || !formData.originalPrice) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">
          Sell Item
        </h2>
        <p className="text-on-surface-variant mt-1">
          Turn your surplus into earnings while reducing waste.
        </p>
      </div>

      <section className="space-y-6">
        {/* Image Upload Area */}
        <div className="relative group">
          <label className="cursor-pointer block">
            <div className="w-full h-56 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low flex flex-col items-center justify-center overflow-hidden transition-all group-active:scale-[0.98]">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <Icon
                    name="add_a_photo"
                    className="text-4xl text-primary mb-2"
                  />
                  <span className="font-semibold text-sm">
                    Upload Product Photo
                  </span>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Clear photos sell 3x faster
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 text-on-surface-variant">
              Vendor Name
            </label>
            <input
              className="w-full px-5 py-4 bg-surface-container-highest rounded-[1rem] border-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
              placeholder="e.g., Mama Bose"
              type="text"
              value={formData.vendorName}
              onChange={(e) =>
                setFormData({ ...formData, vendorName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 text-on-surface-variant">
              Item Name
            </label>
            <input
              className="w-full px-5 py-4 bg-surface-container-highest rounded-[1rem] border-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
              placeholder="e.g., Fresh Peppers"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 text-on-surface-variant">
                Category
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none px-5 py-4 bg-surface-container-highest rounded-[1rem] border-none focus:ring-2 focus:ring-primary/20 text-on-surface"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
                <Icon
                  name="expand_more"
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 text-on-surface-variant">
                Quantity
              </label>
              <input
                className="w-full px-5 py-4 bg-surface-container-highest rounded-[1rem] border-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
                placeholder="e.g., 2 Bags"
                type="text"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 text-on-surface-variant">
              Original Price (₦)
            </label>
            <input
              className="w-full px-5 py-4 bg-surface-container-highest rounded-[1rem] border-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
              placeholder="Enter amount"
              type="number"
              value={formData.originalPrice}
              onChange={(e) =>
                setFormData({ ...formData, originalPrice: e.target.value })
              }
            />
          </div>
        </div>

        {/* AI Pricing Section */}
        <div className="bg-surface-container-low rounded-xl p-5 space-y-4 border border-primary/5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="auto_awesome" filled className="text-primary" />
              <h3 className="font-bold text-sm">Smart Pricing</h3>
            </div>
            <button
              onClick={handleGetAIPrice}
              disabled={aiLoading || !formData.title || !formData.originalPrice}
              className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-4 py-2 rounded-full text-xs font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            >
              {aiLoading ? "Analyzing..." : "Get AI Suggested Price"}
            </button>
          </div>

          {aiResult && (
            <>
              <div className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-[1rem]">
                <div className="flex-1">
                  <p className="text-2xl font-extrabold text-primary">
                    ₦{aiResult.suggestedPrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {aiResult.reason}
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Icon
                    name="trending_down"
                    className="text-primary text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 bg-tertiary-fixed/30 px-3 py-2 rounded-[1rem]">
                <Icon name="eco" className="text-tertiary text-sm" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-tertiary-fixed-variant">
                  Potentially saves {aiResult.co2Saved}kg CO2 emissions
                </span>
              </div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-lg rounded-full shadow-lg shadow-primary/20 active:scale-[0.97] transition-all flex items-center justify-center gap-3"
        >
          {submitted ? (
            <>
              <Icon name="check_circle" />
              Listed Successfully!
            </>
          ) : (
            <>
              Post Listing
              <Icon name="rocket_launch" />
            </>
          )}
        </button>
      </section>
    </div>
  );
}
