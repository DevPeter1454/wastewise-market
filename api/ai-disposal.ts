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
          content: `You are a waste disposal expert helping market women, traders, and everyday Nigerians manage waste properly. A user at a Nigerian market wants to know how to dispose of: "${wasteType}".

Write instructions in simple, friendly Nigerian English (mix of standard English and Pidgin). Be specific and practical — mention real Nigerian recycling companies (Wecyclers, RecyclePoints, Pakam, Chanja Datti), local terms (Mai-Bola for scrap collectors, LAWMA for Lagos waste), and actual Naira prices. Tell them exactly what to do step by step, like you're explaining to a market woman at Balogun or Mile 12 market.

Return ONLY valid JSON with no other text:
{"category": "<Organic Waste|Plastic|Metal|E-Waste|Paper|Glass|Hazardous|General Waste>", "disposalMethod": "<short actionable method like 'Sell to Recyclers' or 'Compost / Animal Feed'>", "compostabilityScore": <0-100>, "co2Offset": <number in kg>, "instructions": "<3-4 sentences of practical disposal guidance in Nigerian English>", "marketValue": "<estimated value in Naira per kg, or what they can get for it>"}`,
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
      disposalMethod: "Sort & Dispose Properly",
      compostabilityScore: 30,
      co2Offset: 0.2,
      instructions: `For "${wasteType}": First separate am from other waste — food waste for one side, plastics for another, metals for another. No burn anything o! Carry organic waste go compost or give to farmers. Plastics and metals, sell to Mai-Bola or recycling collectors for your market. If you no sure, carry am to LAWMA collection point (Lagos) or your nearest waste center.`,
      marketValue: "Check with local recyclers",
    });
  }
}
