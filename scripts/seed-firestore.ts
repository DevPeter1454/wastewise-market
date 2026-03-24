/**
 * Seed Firestore with demo data for WasteWise Market
 *
 * Usage:
 *   1. Download service account key from Firebase Console:
 *      Project Settings → Service Accounts → Generate New Private Key
 *   2. Save as scripts/serviceAccountKey.json
 *   3. Run: npx tsx scripts/seed-firestore.ts
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account key
const serviceAccountPath = resolve(__dirname, "serviceAccountKey.json");
let serviceAccount: any;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));
} catch {
  console.error(
    "❌ Could not find scripts/serviceAccountKey.json\n" +
      "   Download it from Firebase Console → Project Settings → Service Accounts → Generate New Private Key"
  );
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// ─── Sample Listings ──────────────────────────────────────────

const listings = [
  {
    title: "Hausa Tomatoes (Crate)",
    vendorName: "Ibrahim & Sons Farm",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JPD0S6_wfn9Cy-K5L9ZG3YVQVMIHv2HNQ-XtoVnNUHfKWMzMxcvjfS4rAnapx1FJqh3N-uBAoLMbCsFSOQXxBm82B0ILcR4kK6ddtMY7ZWP-l9p2fyc4LsIQ0bsh2r4jlSF8IC8RbJTfYdzoGCwByBI1FgoA9TZUqZC2kwAPJnfMhYvQw9w8PXhylThI1uF0qjKQrS-Xzktd-trbt8B0U5IwHKIAv15Y0ENTxU5vPgm1HuJHKNtDz_oqYtSH9newOwkywFH11Ys",
    category: "Vegetables",
    quantity: "1 Crate",
    originalPrice: 18000,
    discountPrice: 12500,
    discountPercent: 35,
    aiReason:
      "AI suggests this price based on local market trends for tomatoes. Selling at 35% off helps move perishable stock before end of day.",
    co2Saved: 2.1,
    createdAt: Timestamp.now(),
    status: "active",
  },
  {
    title: "Hybrid Bell Peppers",
    vendorName: "Jos Valley Growers",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOJAdVb23nt0jjf4HKeRm0HpN5sjQ-SJ5hjXKNv8XPm6dI9JPAQwWEb5jgtA2BpdRsVAKDPrnEd2_jTVVOkGrqUZD0_OKx3yNcCrI7AFuDq4WX0euZQiC64yPVnfJasPvrziFk3Ddo_DjoOk2oiY8qCn63zk0TqSIK9J6pTkVRQAMPuuHisKWElu2LWUqil9WFRuis7ZHZIksBTQ_joxIk0jan-8DS8CknMS2XCNtAbD9jz6-dYwV2dfN-5y_mhC-v4e1bTQS1Xos",
    category: "Vegetables",
    quantity: "5 kg",
    originalPrice: 5250,
    discountPrice: 4200,
    discountPercent: 20,
    aiReason:
      "Bell peppers are in moderate demand. A 20% discount makes this competitive while preserving margin.",
    co2Saved: 1.2,
    createdAt: Timestamp.fromMillis(Date.now() - 3600 * 1000),
    status: "active",
  },
  {
    title: "Abuja Yam Tubers (5pcs)",
    vendorName: "Green Earth Collective",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArp4aAOlWYsd8LQX14XG125A1JVcufHsvsN3D5ONvb3UqzwHaHANjpzw-e6uYl1a3h4naBbd7ELF26Kk734cwNHVjF6T2iKPJEyXErfG51Z2XaRdO7UrLnuNGMh_Z8uySt5U9ELZe5wk63DJzehMPKjRl6QzYFqxXJgnnEShVwm9ECZH4S0HG-LvLlO_WUN3hzVhVLrfRrwj0P9_1yeLmQIyDXk55f0Z_5z4Bi3UsWeG66EXFHFUfarD_86-5UTGBPFBLEZMy6C7U",
    category: "Vegetables",
    quantity: "5 pieces",
    originalPrice: 10000,
    discountPrice: 8500,
    discountPercent: 15,
    aiReason:
      "Yam tubers have longer shelf life, so a modest 15% discount is enough to attract buyers.",
    co2Saved: 3.5,
    createdAt: Timestamp.fromMillis(Date.now() - 7200 * 1000),
    status: "active",
  },
  {
    title: "Red Onions (Half Bag)",
    vendorName: "Zaria Market Hub",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBU9R4S0QEHimY0Sh36ycQ8Na2FkhLFfXesnQ5_uZC5av4zruzzFfVQQ6tJX6YhcmRpdmhBcrKzBkwNgV5xVyp4qW7AfuP7WEGIvwmzaCaeJ5tHbcReyLFd5ShGcWk2cbabDhKr-Mgwn0o_866YxVmnvjIsTMZosycXEA3Xh9rWOGltxX06tJdUfMxEq6kd3eLeXIAg6KwoCE2D623DOIppyiGdZzltY5s9i47LcNwE5P8-EKRdUDIcvEaEVSoWPh8t7CTvRS-2du0",
    category: "Vegetables",
    quantity: "Half Bag",
    originalPrice: 44000,
    discountPrice: 22000,
    discountPercent: 50,
    aiReason:
      "This is a large quantity at risk of waste. A 50% discount is aggressive but necessary to find a buyer today.",
    co2Saved: 5.8,
    createdAt: Timestamp.fromMillis(Date.now() - 10800 * 1000),
    status: "active",
  },
];

// ─── Cleaning Event + Participants ──────────────────────────────

const cleaningEvent = {
  title: "Market Cleaning Day",
  date: "Saturday, Oct 12th",
  time: "7:00 AM — 10:00 AM",
  location: "Main Gate Assembly Point",
  targetParticipants: 60,
  currentParticipants: 4,
  createdAt: Timestamp.now(),
};

const participants = [
  { name: "Adebayo Okonkwo", stallNumber: "A-5" },
  { name: "Chioma Eze", stallNumber: "B-12" },
  { name: "Emeka Nnamdi", stallNumber: "C-3" },
  { name: "Fatima Abubakar", stallNumber: "D-8" },
];

// ─── Seed Function ──────────────────────────────────────────

async function seed() {
  console.log("🌱 Seeding Firestore...\n");

  // Seed listings
  console.log("📦 Adding listings...");
  for (const listing of listings) {
    const ref = await db.collection("listings").add(listing);
    console.log(`   ✅ ${listing.title} (${ref.id})`);
  }

  // Seed cleaning event
  console.log("\n🧹 Adding cleaning event...");
  const eventRef = db.collection("cleaningEvents").doc("current");
  await eventRef.set(cleaningEvent);
  console.log(`   ✅ ${cleaningEvent.title} (current)`);

  // Seed participants
  console.log("\n👥 Adding participants...");
  for (const participant of participants) {
    const ref = await eventRef.collection("participants").add({
      ...participant,
      joinedAt: Timestamp.now(),
    });
    console.log(`   ✅ ${participant.name} — Stall ${participant.stallNumber} (${ref.id})`);
  }

  console.log("\n✨ Seeding complete! Your Firestore is ready.");
  console.log(
    `   → ${listings.length} listings\n` +
      `   → 1 cleaning event\n` +
      `   → ${participants.length} participants`
  );
}

seed().catch(console.error);
