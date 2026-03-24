import { useState } from "react";
import type { AIDisposalResult } from "../types";

// Cached disposal guides for common Nigerian market waste types.
// Written in Nigerian Pidgin-English mix so market women and
// everyday users can follow the instructions easily.
const COMMON_WASTE: Record<string, AIDisposalResult> = {
  "rotten tomatoes": {
    category: "Organic Waste",
    disposalMethod: "Compost / Sell to Farmers",
    compostabilityScore: 95,
    co2Offset: 0.3,
    instructions:
      "Don't throw am away! Gather the spoilt tomatoes, remove any nylon or rubber. You fit dig small pit behind your stall, pack am inside — e go turn to good fertilizer in 2-3 weeks. If you no get space, ask the farmers wey dey come market if them wan buy for animal feed. Some agric people dey collect am for ₦100-₦150 per kg.",
    marketValue: "₦100–₦150/kg (fertilizer buyers)",
  },
  "nylon bags": {
    category: "Plastic",
    disposalMethod: "Sell to Recyclers",
    compostabilityScore: 0,
    co2Offset: 0.8,
    instructions:
      "Gather all your nylon — black, white, cellophane, everything. Shake out any food or dirt, then pack inside one big bag. No burn am o! The smoke dey cause cancer. Carry am go the recycling people for market — some dey pay ₦30-₦50 per kilo. For Lagos, call Wecyclers. For Abuja, try Chanja Datti.",
    marketValue: "₦30–₦50/kg",
  },
  "pure water sachet": {
    category: "Plastic",
    disposalMethod: "Sell to Recyclers",
    compostabilityScore: 0,
    co2Offset: 0.5,
    instructions:
      "Pure water sachet na one of the easiest things to recycle for Naija. Rinse am small, press am flat, gather inside one bag. Wecyclers, RecyclePoints, and Pakam dey pay for am. If you sell bulk (like 50kg), you fit get ₦80 per kilo. No burn am, no block gutter — e fit cause flood.",
    marketValue: "₦60–₦80/kg (bulk)",
  },
  "plantain peels": {
    category: "Organic Waste",
    disposalMethod: "Compost / Animal Feed",
    compostabilityScore: 98,
    co2Offset: 0.4,
    instructions:
      "Plantain peel get plenty use! Dry am under sun then grind am — e dey good as animal feed for goats and chickens. You fit also chop am small and put for compost pit, e decompose quick. Some fish farmers dey buy am too. Just no mix am with nylon or dirty things.",
    marketValue: "₦80–₦120/kg (dried, as feed)",
  },
  "pet bottles": {
    category: "Plastic",
    disposalMethod: "Sell to Recyclers",
    compostabilityScore: 0,
    co2Offset: 1.2,
    instructions:
      "Plastic bottles (Coke, Fanta, water) get high value for recycling. Press am flat, remove the cap (na different plastic). When you get 20-50 kg, call recycling company. For Lagos try RecyclePoints or Wecyclers, for Abuja try Chanja Datti. Them go pay you cash or give you points.",
    marketValue: "₦100–₦150/kg",
  },
  "food waste": {
    category: "Organic Waste",
    disposalMethod: "Compost / Animal Feed",
    compostabilityScore: 85,
    co2Offset: 0.4,
    instructions:
      "Leftover rice, beans, eba, amala — no just throw for dustbin. Separate from nylon and paper first. The food waste fit go for compost or give am to people wey get pigs, goats, or chicken. Urban farmers around market dey collect for free. If you dey do am regularly, arrange weekly pickup with them.",
    marketValue: "Free pickup (animal feed)",
  },
  "cardboard": {
    category: "Paper",
    disposalMethod: "Sell to Recyclers",
    compostabilityScore: 60,
    co2Offset: 0.6,
    instructions:
      "Carton boxes, cardboard — flatten am and stack together. Keep am dry because wet cardboard no get value. The Mai-Bola (scrap collectors) wey push wheelbarrow around market go buy am. Paper recycling companies dey collect too. If e dirty with food, you fit tear am small and compost am.",
    marketValue: "₦30–₦50/kg",
  },
  "tin cans": {
    category: "Metal",
    disposalMethod: "Sell to Scrap Dealers",
    compostabilityScore: 0,
    co2Offset: 1.5,
    instructions:
      "Sardine, milk, tomato tins — rinse am, press flat. Sell to the Mai-Bola or scrap metal dealers. Metal get good value and dem recycle am forever. No throw for gutter — sharp edges fit cut people. If you get plenty, scrap dealers go come pick up from your stall.",
    marketValue: "₦80–₦200/kg",
  },
  "banana peels": {
    category: "Organic Waste",
    disposalMethod: "Compost / Animal Feed",
    compostabilityScore: 97,
    co2Offset: 0.3,
    instructions:
      "Banana peel dey very good for compost — e get potassium wey plants love. Chop am small and put for compost pit. You fit dry for sun and sell to livestock people. Or just give the goat sellers nearby — their goats go chop am well well.",
    marketValue: "₦50–₦80/kg (dried, as feed)",
  },
  "styrofoam": {
    category: "Plastic",
    disposalMethod: "Special Recycling",
    compostabilityScore: 0,
    co2Offset: 0.3,
    instructions:
      "Styrofoam (takeaway containers) na wahala — e no dey decompose at all. No burn am! The fumes dey very dangerous. For Lagos, RecyclePoints dey collect am. If nobody dey collect for your area, pack am dry inside bag, carry to the nearest waste collection point. Better still, try carry your own container when buying food.",
    marketValue: "₦10–₦20/kg (limited demand)",
  },
  "palm oil waste": {
    category: "Organic Waste",
    disposalMethod: "Compost / Biofuel",
    compostabilityScore: 70,
    co2Offset: 0.5,
    instructions:
      "Palm kernel shells fit use as fuel instead of firewood. The soft part fit go for compost. If you dey Mile 12 or Oyingbo area, palm oil processors dey always look for people to take the waste. Some biofuel companies dey even pay for palm kernel shells in bulk.",
    marketValue: "₦20–₦40/kg (shells for fuel)",
  },
  "glass bottles": {
    category: "Glass",
    disposalMethod: "Return / Sell to Collectors",
    compostabilityScore: 0,
    co2Offset: 0.9,
    instructions:
      "Beer bottles, soft drink bottles — most get refund value. Carry am back to where you buy am or any beer parlour. Broken glass, wrap am inside newspaper or carton so e no cut person. Scrap collectors dey buy glass too. No mix with other waste — e dey dangerous for waste sorters.",
    marketValue: "₦10–₦30 per bottle (refund)",
  },
  "fish waste": {
    category: "Organic Waste",
    disposalMethod: "Compost / Animal Feed",
    compostabilityScore: 90,
    co2Offset: 0.3,
    instructions:
      "Fish bones, head, innards — handle am fast because e dey smell quick. Bury am inside garden or compost pit for rich fertilizer. Pig farmers and poultry farms dey buy fish waste for feed. If you dey fish market area, arrange with nearby farms. Just no leave am open where flies go gather.",
    marketValue: "₦50–₦100/kg (feed processors)",
  },
  "used cooking oil": {
    category: "Hazardous",
    disposalMethod: "Sell to Soap Makers",
    compostabilityScore: 0,
    co2Offset: 0.7,
    instructions:
      "No pour used groundnut oil or palm oil inside drain o! E go block pipes and spoil water. Let am cool, filter with cloth, pack inside container. Soap makers dey buy used cooking oil for good price. Some biodiesel companies dey collect am too. If you fry food for market, collect your used oil for one week then sell am once.",
    marketValue: "₦100–₦200/litre",
  },
  "yam peels": {
    category: "Organic Waste",
    disposalMethod: "Compost / Animal Feed",
    compostabilityScore: 96,
    co2Offset: 0.3,
    instructions:
      "Yam peels dey very good for compost — plenty nutrients inside. Chop small-small, add to compost pit. Goat rearers and pig farmers dey collect for free or pay small. If you dey peel yam for market, arrange one corner to gather the peels — farmers go come carry am. Dry am for sun and grind for animal feed.",
    marketValue: "₦50–₦80/kg (dried, as feed)",
  },
  "pepper waste": {
    category: "Organic Waste",
    disposalMethod: "Compost",
    compostabilityScore: 92,
    co2Offset: 0.2,
    instructions:
      "Spoilt pepper, pepper seeds, and pepper stems all fit go for compost. Mix am with dry leaves or cardboard to balance the compost. If the pepper still get small life, you fit dry am for sun — dried pepper still dey sell for market. Pepper waste dey good for making organic pesticide too — soak am in water for two days, then spray on plants.",
    marketValue: "₦50–₦100/kg (dried pepper)",
  },
  "onion waste": {
    category: "Organic Waste",
    disposalMethod: "Compost",
    compostabilityScore: 88,
    co2Offset: 0.2,
    instructions:
      "Onion peels and spoilt onions fit compost well. The dry skin dey good for making natural dye too. Put am for compost pit with other food waste. If you get plenty onion waste, some farmers dey use onion water (soaked peels) as organic pesticide for their farms — you fit sell to them.",
    marketValue: "₦30–₦50/kg (compost/pesticide)",
  },
};

// Aliases map common search variations to canonical cache keys
const ALIASES: Record<string, string> = {
  "plastic bottles": "pet bottles",
  "plastic bottle": "pet bottles",
  "water bottle": "pet bottles",
  "water bottles": "pet bottles",
  "coke bottle": "pet bottles",
  "fanta bottle": "pet bottles",
  "tomatoes": "rotten tomatoes",
  "spoilt tomatoes": "rotten tomatoes",
  "bad tomatoes": "rotten tomatoes",
  "tomato waste": "rotten tomatoes",
  "nylon": "nylon bags",
  "nylon bag": "nylon bags",
  "cellophane": "nylon bags",
  "rubber bags": "nylon bags",
  "polythene": "nylon bags",
  "polythene bags": "nylon bags",
  "pure water": "pure water sachet",
  "pure water sachets": "pure water sachet",
  "sachet water": "pure water sachet",
  "sachet": "pure water sachet",
  "plantain peel": "plantain peels",
  "plantain": "plantain peels",
  "banana peel": "banana peels",
  "banana": "banana peels",
  "carton": "cardboard",
  "cartons": "cardboard",
  "box": "cardboard",
  "boxes": "cardboard",
  "tin": "tin cans",
  "tins": "tin cans",
  "cans": "tin cans",
  "sardine tin": "tin cans",
  "milk tin": "tin cans",
  "tomato tin": "tin cans",
  "styrofoam container": "styrofoam",
  "takeaway pack": "styrofoam",
  "takeaway container": "styrofoam",
  "foam": "styrofoam",
  "glass": "glass bottles",
  "glass bottle": "glass bottles",
  "beer bottle": "glass bottles",
  "beer bottles": "glass bottles",
  "broken glass": "glass bottles",
  "fish bone": "fish waste",
  "fish bones": "fish waste",
  "fish head": "fish waste",
  "fish": "fish waste",
  "cooking oil": "used cooking oil",
  "groundnut oil": "used cooking oil",
  "vegetable oil": "used cooking oil",
  "used oil": "used cooking oil",
  "palm oil": "palm oil waste",
  "palm kernel": "palm oil waste",
  "food leftover": "food waste",
  "food leftovers": "food waste",
  "leftover food": "food waste",
  "eba": "food waste",
  "amala": "food waste",
  "rice waste": "food waste",
  "garri": "food waste",
  "yam peel": "yam peels",
  "yam": "yam peels",
  "pepper": "pepper waste",
  "peppers": "pepper waste",
  "spoilt pepper": "pepper waste",
  "onion": "onion waste",
  "onions": "onion waste",
  "onion peels": "onion waste",
  "onion peel": "onion waste",
};

function lookupCache(wasteType: string): AIDisposalResult | null {
  const key = wasteType.toLowerCase().trim();

  // Direct match
  if (COMMON_WASTE[key]) return COMMON_WASTE[key];

  // Alias match
  const aliasKey = ALIASES[key];
  if (aliasKey && COMMON_WASTE[aliasKey]) return COMMON_WASTE[aliasKey];

  // Partial match — check if the search term is contained in any key or alias
  for (const [canonical, result] of Object.entries(COMMON_WASTE)) {
    if (canonical.includes(key) || key.includes(canonical)) return result;
  }
  for (const [alias, canonical] of Object.entries(ALIASES)) {
    if (alias.includes(key) || key.includes(alias)) {
      if (COMMON_WASTE[canonical]) return COMMON_WASTE[canonical];
    }
  }

  return null;
}

export function useAIDisposal() {
  const [result, setResult] = useState<AIDisposalResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDisposal = async (wasteType: string) => {
    setLoading(true);
    setError(null);

    // Check cache first (with alias + fuzzy matching)
    const cached = lookupCache(wasteType);
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
      // Offline or API unavailable — give actionable Nigerian-specific advice
      setResult({
        category: "General Waste",
        disposalMethod: "Sort & Dispose Properly",
        compostabilityScore: 30,
        co2Offset: 0.2,
        instructions: `For "${wasteType}": First, separate am from other waste — put organic (food) waste for one side, plastics for another, and metals for another. No burn anything o! For organic waste, compost am or give to farmers. For plastics and metal, sell to the Mai-Bola or recycling collectors wey dey your market. If you no sure, carry am to the nearest LAWMA (Lagos) or waste collection center.`,
        marketValue: "Check with local recyclers",
      });
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, getDisposal };
}
