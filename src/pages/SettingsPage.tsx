import { useState, useCallback, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Icon from "../components/shared/Icon";
import Toast from "../components/shared/Toast";
import type { Listing } from "../types";

const CATEGORIES = ["Vegetables", "Tubers", "Fruits", "Grains", "Legumes", "Spices", "Herbs", "Dairy"];

export default function SettingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    vendorName: "",
    category: "",
    quantity: "",
    originalPrice: "",
    discountPrice: "",
  });
  const [saving, setSaving] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState("check_circle");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const hideToast = useCallback(() => setToastVisible(false), []);

  // Fetch all listings (no status filter — show everything including sold)
  useEffect(() => {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    if (!projectId) {
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as Listing[];
          setListings(items);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );

      const timeout = setTimeout(() => setLoading(false), 5000);

      return () => {
        clearTimeout(timeout);
        unsubscribe();
      };
    } catch {
      setLoading(false);
    }
  }, []);

  const startEdit = (listing: Listing) => {
    setEditingId(listing.id);
    setEditForm({
      title: listing.title,
      vendorName: listing.vendorName,
      category: listing.category,
      quantity: listing.quantity,
      originalPrice: String(listing.originalPrice),
      discountPrice: String(listing.discountPrice),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (listingId: string) => {
    setSaving(true);
    const originalPrice = parseInt(editForm.originalPrice);
    const discountPrice = parseInt(editForm.discountPrice);
    const discountPercent = Math.round(
      ((originalPrice - discountPrice) / originalPrice) * 100
    );

    try {
      await Promise.race([
        updateDoc(doc(db, "listings", listingId), {
          title: editForm.title,
          vendorName: editForm.vendorName,
          category: editForm.category,
          quantity: editForm.quantity,
          originalPrice,
          discountPrice,
          discountPercent,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 5000)
        ),
      ]);
      setToastIcon("check_circle");
      setToastMessage("Listing updated successfully");
    } catch {
      setToastIcon("error");
      setToastMessage("Could not update — check your connection");
    }

    setSaving(false);
    setEditingId(null);
    setToastVisible(true);
  };

  const deleteListing = async (listingId: string) => {
    try {
      await Promise.race([
        deleteDoc(doc(db, "listings", listingId)),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 5000)
        ),
      ]);
      setToastIcon("delete");
      setToastMessage("Listing removed");
    } catch {
      setToastIcon("error");
      setToastMessage("Could not delete — check your connection");
    }
    setConfirmDeleteId(null);
    setToastVisible(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface">
          Settings
        </h1>
        <p className="text-secondary mt-2 text-lg">
          Manage your listings and account preferences.
        </p>
      </div>

      {/* My Listings Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Icon name="inventory_2" className="text-primary" />
            My Listings
          </h2>
          <span className="text-sm text-on-surface-variant">
            {listings.length} item{listings.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-surface-container-lowest rounded-xl p-4 animate-pulse flex gap-4"
              >
                <div className="w-20 h-20 bg-surface-container-high rounded-lg shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-surface-container-high rounded w-2/3" />
                  <div className="h-3 bg-surface-container-high rounded w-1/3" />
                  <div className="h-3 bg-surface-container-high rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-8 text-center">
            <Icon
              name="storefront"
              className="text-5xl text-on-surface-variant/30 mb-3"
            />
            <p className="text-on-surface-variant font-medium">
              No listings yet
            </p>
            <p className="text-sm text-on-surface-variant/70 mt-1">
              Items you list for sale will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(19,27,46,0.04)] overflow-hidden"
              >
                {editingId === listing.id ? (
                  /* Edit Mode */
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-sm text-primary flex items-center gap-1">
                        <Icon name="edit" className="text-sm" />
                        Editing Listing
                      </h3>
                      <button
                        onClick={cancelEdit}
                        className="text-on-surface-variant hover:text-on-surface"
                      >
                        <Icon name="close" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant">
                          Item Name
                        </label>
                        <input
                          className="w-full px-4 py-3 bg-surface-container-highest rounded-xl border-none text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm({ ...editForm, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant">
                          Vendor Name
                        </label>
                        <input
                          className="w-full px-4 py-3 bg-surface-container-highest rounded-xl border-none text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          value={editForm.vendorName}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              vendorName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant">
                          Category
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-surface-container-highest rounded-xl border-none text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant">
                          Quantity
                        </label>
                        <input
                          className="w-full px-4 py-3 bg-surface-container-highest rounded-xl border-none text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          value={editForm.quantity}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              quantity: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant">
                          Original Price (₦)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-surface-container-highest rounded-xl border-none text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          value={editForm.originalPrice}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              originalPrice: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant">
                          Discount Price (₦)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-surface-container-highest rounded-xl border-none text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          value={editForm.discountPrice}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              discountPrice: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => saveEdit(listing.id)}
                        disabled={saving}
                        className="flex-1 bg-primary text-on-primary py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {saving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Icon name="save" className="text-sm" />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-6 py-3 bg-surface-container-high text-on-surface-variant rounded-full font-bold text-sm active:scale-95 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div className="flex items-center gap-4 p-4">
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-bold text-on-surface truncate">
                            {listing.title}
                          </h3>
                          <p className="text-sm text-on-surface-variant truncate">
                            {listing.vendorName}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                            listing.status === "active"
                              ? "bg-primary/10 text-primary"
                              : "bg-on-surface-variant/10 text-on-surface-variant"
                          }`}
                        >
                          {listing.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-bold text-primary">
                          ₦{listing.discountPrice?.toLocaleString()}
                        </span>
                        <span className="text-xs text-on-surface-variant line-through">
                          ₦{listing.originalPrice?.toLocaleString()}
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          {listing.category}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => startEdit(listing)}
                        className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
                        title="Edit listing"
                      >
                        <Icon name="edit" className="text-xl" />
                      </button>

                      {confirmDeleteId === listing.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => deleteListing(listing.id)}
                            className="px-3 py-1.5 bg-error text-on-error rounded-full text-xs font-bold active:scale-95 transition-all"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant"
                          >
                            <Icon name="close" className="text-lg" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(listing.id)}
                          className="p-2 rounded-full hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors"
                          title="Remove listing"
                        >
                          <Icon name="delete" className="text-xl" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Toast
        message={toastMessage}
        icon={toastIcon}
        visible={toastVisible}
        onClose={hideToast}
      />
    </div>
  );
}
