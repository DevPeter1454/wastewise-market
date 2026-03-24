import { useState } from "react";
import type { AIDisposalResult } from "../types";

// Cached fallback responses for common waste types
const COMMON_WASTE: Record<string, AIDisposalResult> = {
  "rotten tomatoes": {
    category: "Organic Waste",
    disposalMethod: "Home Compost",
    compostabilityScore: 95,
    co2Offset: 0.3,
    instructions:
      "Separate from plastic and metallic contaminants. Can be used for home compost or sold to local organic fertilizer collectors. High nitrogen content makes this ideal for soil enrichment.",
    marketValue: "₦150/kg",
  },
  "nylon bags": {
    category: "Plastic",
    disposalMethod: "Recycling Center",
    compostabilityScore: 0,
    co2Offset: 0.8,
    instructions:
      "Clean and dry the nylon bags. Bundle them together and take to the nearest plastic recycling center. Do not burn — burning nylon releases toxic fumes.",
    marketValue: "₦50/kg",
  },
  "pure water sachet": {
    category: "Plastic",
    disposalMethod: "Recycling Center",
    compostabilityScore: 0,
    co2Offset: 0.5,
    instructions:
      "Rinse sachets, flatten them, and collect in a bag. Drop off at recycling collection points. These are one of the most recyclable plastics in Lagos.",
    marketValue: "₦80/kg",
  },
  "plantain peels": {
    category: "Organic Waste",
    disposalMethod: "Home Compost",
    compostabilityScore: 98,
    co2Offset: 0.4,
    instructions:
      "Plantain peels are excellent for composting. Chop into smaller pieces for faster decomposition. Can also be dried and used as animal feed supplement.",
    marketValue: "₦100/kg",
  },
  "pet bottles": {
    category: "Plastic",
    disposalMethod: "Recycling Center",
    compostabilityScore: 0,
    co2Offset: 1.2,
    instructions:
      "Crush bottles to save space. Remove caps (different plastic type). Take to recycling centers — PET bottles have high recycling value in Lagos.",
    marketValue: "₦120/kg",
  },
};

export function useAIDisposal() {
  const [result, setResult] = useState<AIDisposalResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDisposal = async (wasteType: string) => {
    setLoading(true);
    setError(null);

    // Check cache first
    const cached = COMMON_WASTE[wasteType.toLowerCase().trim()];
    if (cached) {
      setResult(cached);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/ai-disposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wasteType }),
      });

      if (!res.ok) throw new Error("Failed to get disposal guide");

      const json = await res.json();
      setResult(json);
    } catch {
      // Fallback: provide a generic response
      setResult({
        category: "General Waste",
        disposalMethod: "Proper Disposal",
        compostabilityScore: 20,
        co2Offset: 0.2,
        instructions: `For "${wasteType}": Please separate from other waste types. Check with your local waste management authority for the best disposal method. When in doubt, take to the nearest waste collection center.`,
        marketValue: "No market value",
      });
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, getDisposal };
}
