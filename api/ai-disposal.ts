import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { wasteType } = req.body;

  if (!wasteType) {
    return res.status(400).json({ error: "Missing wasteType field" });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `You are a waste disposal expert for Lagos, Nigeria. A user wants to know how to dispose of: "${wasteType}". Classify this waste and provide detailed disposal instructions relevant to Lagos. Return ONLY valid JSON with no other text: {"category": "<Organic Waste|Plastic|Metal|E-Waste|Paper|Glass|Hazardous|General Waste>", "disposalMethod": "<short method name>", "compostabilityScore": <0-100>, "co2Offset": <number in kg>, "instructions": "<2-3 sentences of disposal guidance>", "marketValue": "<estimated value per kg in Naira or 'No market value'>"}`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const parsed = JSON.parse(text);
    return res.status(200).json(parsed);
  } catch (error) {
    console.error("AI disposal error:", error);
    return res.status(200).json({
      category: "General Waste",
      disposalMethod: "Proper Disposal",
      compostabilityScore: 20,
      co2Offset: 0.2,
      instructions: `For "${wasteType}": Please separate from other waste types and take to your nearest waste collection center. Contact your local waste management authority for specific disposal guidance.`,
      marketValue: "Contact recycler for pricing",
    });
  }
}
