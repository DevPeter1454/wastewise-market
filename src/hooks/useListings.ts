import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { Listing } from "../types";

// Sample data for demo/fallback when Firebase is not configured
const SAMPLE_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Hausa Tomatoes (Crate)",
    vendorName: "Ibrahim & Sons Farm",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JPD0S6_wfn9Cy-K5L9ZG3YVQVMIHv2HNQ-XtoVnNUHfKWMzMxcvjfS4rAnapx1FJqh3N-uBAoLMbCsFSOQXxBm82B0ILcR4kK6ddtMY7ZWP-l9p2fyc4LsIQ0bsh2r4jlSF8IC8RbJTfYdzoGCwByBI1FgoA9TZUqZC2kwAPJnfMhYvQw9w8PXhylThI1uF0qjKQrS-Xzktd-trbt8B0U5IwHKIAv15Y0ENTxU5vPgm1HuJHKNtDz_oqYtSH9newOwkywFH11Ys",
    category: "Vegetables",
    quantity: "1 Crate",
    originalPrice: 18000,
    discountPrice: 12500,
    discountPercent: 35,
    co2Saved: 2.1,
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
    status: "active",
  },
  {
    id: "2",
    title: "Hybrid Bell Peppers",
    vendorName: "Jos Valley Growers",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOJAdVb23nt0jjf4HKeRm0HpN5sjQ-SJ5hjXKNv8XPm6dI9JPAQwWEb5jgtA2BpdRsVAKDPrnEd2_jTVVOkGrqUZD0_OKx3yNcCrI7AFuDq4WX0euZQiC64yPVnfJasPvrziFk3Ddo_DjoOk2oiY8qCn63zk0TqSIK9J6pTkVRQAMPuuHisKWElu2LWUqil9WFRuis7ZHZIksBTQ_joxIk0jan-8DS8CknMS2XCNtAbD9jz6-dYwV2dfN-5y_mhC-v4e1bTQS1Xos",
    category: "Vegetables",
    quantity: "5 kg",
    originalPrice: 5250,
    discountPrice: 4200,
    discountPercent: 20,
    co2Saved: 1.2,
    createdAt: { seconds: Date.now() / 1000 - 3600, nanoseconds: 0 } as any,
    status: "active",
  },
  {
    id: "3",
    title: "Oyo State Yam Tubers (5pcs)",
    vendorName: "Oyo Farmer's Collective",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArp4aAOlWYsd8LQX14XG125A1JVcufHsvsN3D5ONvb3UqzwHaHANjpzw-e6uYl1a3h4naBbd7ELF26Kk734cwNHVjF6T2iKPJEyXErfG51Z2XaRdO7UrLnuNGMh_Z8uySt5U9ELZe5wk63DJzehMPKjRl6QzYFqxXJgnnEShVwm9ECZH4S0HG-LvLlO_WUN3hzVhVLrfRrwj0P9_1yeLmQIyDXk55f0Z_5z4Bi3UsWeG66EXFHFUfarD_86-5UTGBPFBLEZMy6C7U",
    category: "Vegetables",
    quantity: "5 pieces",
    originalPrice: 10000,
    discountPrice: 8500,
    discountPercent: 15,
    co2Saved: 3.5,
    createdAt: { seconds: Date.now() / 1000 - 7200, nanoseconds: 0 } as any,
    status: "active",
  },
  {
    id: "4",
    title: "Red Onions (Half Bag)",
    vendorName: "Oja Oba Market Hub",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBU9R4S0QEHimY0Sh36ycQ8Na2FkhLFfXesnQ5_uZC5av4zruzzFfVQQ6tJX6YhcmRpdmhBcrKzBkwNgV5xVyp4qW7AfuP7WEGIvwmzaCaeJ5tHbcReyLFd5ShGcWk2cbabDhKr-Mgwn0o_866YxVmnvjIsTMZosycXEA3Xh9rWOGltxX06tJdUfMxEq6kd3eLeXIAg6KwoCE2D623DOIppyiGdZzltY5s9i47LcNwE5P8-EKRdUDIcvEaEVSoWPh8t7CTvRS-2du0",
    category: "Vegetables",
    quantity: "Half Bag",
    originalPrice: 44000,
    discountPrice: 22000,
    discountPercent: 50,
    co2Saved: 5.8,
    createdAt: { seconds: Date.now() / 1000 - 10800, nanoseconds: 0 } as any,
    status: "active",
  },
  {
    id: "5",
    title: "Oyo State Yam Tubers (10pcs)",
    vendorName: "Saki Farm Cooperative",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArp4aAOlWYsd8LQX14XG125A1JVcufHsvsN3D5ONvb3UqzwHaHANjpzw-e6uYl1a3h4naBbd7ELF26Kk734cwNHVjF6T2iKPJEyXErfG51Z2XaRdO7UrLnuNGMh_Z8uySt5U9ELZe5wk63DJzehMPKjRl6QzYFqxXJgnnEShVwm9ECZH4S0HG-LvLlO_WUN3hzVhVLrfRrwj0P9_1yeLmQIyDXk55f0Z_5z4Bi3UsWeG66EXFHFUfarD_86-5UTGBPFBLEZMy6C7U",
    category: "Tubers",
    quantity: "10 pieces",
    originalPrice: 15000,
    discountPrice: 11000,
    discountPercent: 27,
    co2Saved: 3.2,
    createdAt: { seconds: Date.now() / 1000 - 14400, nanoseconds: 0 } as any,
    status: "active",
  },
  {
    id: "6",
    title: "Fresh Cassava (50kg Bag)",
    vendorName: "Bodija Farmers Market",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBU9R4S0QEHimY0Sh36ycQ8Na2FkhLFfXesnQ5_uZC5av4zruzzFfVQQ6tJX6YhcmRpdmhBcrKzBkwNgV5xVyp4qW7AfuP7WEGIvwmzaCaeJ5tHbcReyLFd5ShGcWk2cbabDhKr-Mgwn0o_866YxVmnvjIsTMZosycXEA3Xh9rWOGltxX06tJdUfMxEq6kd3eLeXIAg6KwoCE2D623DOIppyiGdZzltY5s9i47LcNwE5P8-EKRdUDIcvEaEVSoWPh8t7CTvRS-2du0",
    category: "Tubers",
    quantity: "50 kg",
    originalPrice: 22000,
    discountPrice: 16500,
    discountPercent: 25,
    co2Saved: 4.1,
    createdAt: { seconds: Date.now() / 1000 - 18000, nanoseconds: 0 } as any,
    status: "active",
  },
  {
    id: "7",
    title: "Brown Cowpeas (Beans) 25kg",
    vendorName: "Ogbomoso Agric Hub",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOJAdVb23nt0jjf4HKeRm0HpN5sjQ-SJ5hjXKNv8XPm6dI9JPAQwWEb5jgtA2BpdRsVAKDPrnEd2_jTVVOkGrqUZD0_OKx3yNcCrI7AFuDq4WX0euZQiC64yPVnfJasPvrziFk3Ddo_DjoOk2oiY8qCn63zk0TqSIK9J6pTkVRQAMPuuHisKWElu2LWUqil9WFRuis7ZHZIksBTQ_joxIk0jan-8DS8CknMS2XCNtAbD9jz6-dYwV2dfN-5y_mhC-v4e1bTQS1Xos",
    category: "Legumes",
    quantity: "25 kg",
    originalPrice: 30000,
    discountPrice: 24000,
    discountPercent: 20,
    co2Saved: 2.8,
    createdAt: { seconds: Date.now() / 1000 - 21600, nanoseconds: 0 } as any,
    status: "active",
  },
  {
    id: "8",
    title: "Fresh Ginger (5kg Bundle)",
    vendorName: "Iseyin Spice Traders",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JPD0S6_wfn9Cy-K5L9ZG3YVQVMIHv2HNQ-XtoVnNUHfKWMzMxcvjfS4rAnapx1FJqh3N-uBAoLMbCsFSOQXxBm82B0ILcR4kK6ddtMY7ZWP-l9p2fyc4LsIQ0bsh2r4jlSF8IC8RbJTfYdzoGCwByBI1FgoA9TZUqZC2kwAPJnfMhYvQw9w8PXhylThI1uF0qjKQrS-Xzktd-trbt8B0U5IwHKIAv15Y0ENTxU5vPgm1HuJHKNtDz_oqYtSH9newOwkywFH11Ys",
    category: "Spices",
    quantity: "5 kg",
    originalPrice: 8500,
    discountPrice: 6000,
    discountPercent: 29,
    co2Saved: 1.0,
    createdAt: { seconds: Date.now() / 1000 - 25200, nanoseconds: 0 } as any,
    status: "active",
  },
];

export function useListings(category?: string) {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Firebase is configured
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    if (!projectId) {
      setAllListings(SAMPLE_LISTINGS);
      setLoading(false);
      return;
    }

    try {
      // Simple query — no composite index needed.
      // Category filtering is done client-side.
      const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Listing[];
          setAllListings(items.length > 0 ? items : SAMPLE_LISTINGS);
          setLoading(false);
        },
        () => {
          // On error, fall back to sample data
          setAllListings(SAMPLE_LISTINGS);
          setLoading(false);
        }
      );

      // Safety timeout: fall back to sample data if Firestore hasn't responded
      const timeout = setTimeout(() => {
        setAllListings((prev) => prev.length > 0 ? prev : SAMPLE_LISTINGS);
        setLoading(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
        unsubscribe();
      };
    } catch {
      setAllListings(SAMPLE_LISTINGS);
      setLoading(false);
    }
  }, []);

  // Filter by status and category client-side (avoids composite index requirement)
  const listings = allListings.filter((l) => {
    if (l.status && l.status !== "active") return false;
    if (category && category !== "All" && l.category !== category) return false;
    return true;
  });

  return { listings, loading };
}
