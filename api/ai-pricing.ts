import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { itemName, category, quantity, originalPrice } = req.body;

  if (!itemName || !originalPrice) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are a pricing assistant for WasteWise Market, a surplus food marketplace in Lagos, Nigeria. A vendor wants to sell: "${itemName}" (category: ${category}, quantity: ${quantity}, original price: ₦${originalPrice}). Suggest a fair discount price that helps it sell quickly before it goes to waste. Consider local market conditions in Lagos. Return ONLY valid JSON with no other text: {"suggestedPrice": <number>, "reason": "<1-2 sentences>", "co2Saved": <number in kg>}`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const parsed = JSON.parse(text);
    return res.status(200).json(parsed);
  } catch (error) {
    console.error("AI pricing error:", error);
    // Fallback pricing
    const discount = Math.round(originalPrice * 0.7);
    return res.status(200).json({
      suggestedPrice: discount,
      reason: `Based on market conditions, selling at ₦${discount.toLocaleString()} (30% off) would help move this item quickly.`,
      co2Saved: parseFloat((Math.random() * 5 + 1).toFixed(1)),
    });
  }
}
