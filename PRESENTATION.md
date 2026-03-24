# WasteWise Market — Hackathon Presentation

---

## DESIGN SYSTEM & AI GENERATION GUIDE

> **Paste this entire section as context when prompting an AI slide generator (Gamma, Beautiful.ai, Canva AI, Google Slides + Gemini, etc.)**

### Brand Identity
- **App Name:** WasteWise Market
- **Tagline:** "Turn surplus into savings. Turn waste into wealth."
- **Tone:** Bold, optimistic, grounded in Nigerian street-market energy. Not corporate — think community-first, approachable, action-driven.
- **Audience:** Hackathon judges, tech community, potential investors

### Color Palette (from the app's Material Design 3 theme)

| Role | Hex | Usage |
|------|-----|-------|
| **Primary Green** | `#006B2C` | Headlines, CTA buttons, key metrics, icon fills |
| **Primary Container** | `#00873A` | Secondary buttons, card accents, gradient endpoints |
| **Primary Fixed (Mint)** | `#7FFC97` | Highlight text on dark backgrounds, glow accents |
| **Tertiary Gold** | `#735C00` | Stat callouts, badge backgrounds, financial figures |
| **Tertiary Fixed (Warm Yellow)** | `#FFE083` | Earn/impact banners, warning accents |
| **Surface (Off-White)** | `#FAF8FF` | Slide backgrounds, card fills |
| **Surface Container** | `#EAEDFF` | Secondary card backgrounds, subtle section dividers |
| **On Surface (Dark Navy)** | `#131B2E` | Body text, paragraph copy |
| **On Surface Variant** | `#3E4A3D` | Subtle captions, secondary labels |
| **Error Red** | `#BA1A1A` | Problem slide accents, waste/loss statistics |
| **White** | `#FFFFFF` | Text on green/dark backgrounds, card surfaces |

**Gradient to use on hero/title slides:**
```
background: linear-gradient(135deg, #006B2C 0%, #00873A 50%, #006B2C 100%);
```

**Dark accent gradient (for problem slide or dramatic sections):**
```
background: linear-gradient(135deg, #131B2E 0%, #283044 100%);
```

### Typography

| Element | Font | Weight | Size Guidance |
|---------|------|--------|---------------|
| Slide titles | **Manrope** | 800 (ExtraBold) | 40–56px |
| Subtitles | **Manrope** | 700 (Bold) | 24–32px |
| Body text | **Inter** | 400 (Regular) | 18–22px |
| Labels & captions | **Inter** | 600 (SemiBold) | 12–14px, uppercase tracking-wide |
| Stat numbers | **Manrope** | 900 (Black) | 48–72px |
| Code/tech | **JetBrains Mono** or monospace | 400 | 14–16px |

**Fallbacks:** If Manrope unavailable, use **Poppins** or **DM Sans**. If Inter unavailable, use **Roboto** or system sans-serif.

### Visual Style Guidelines

**Layout:**
- Use generous whitespace — no crowded slides
- Left-aligned text by default; centered only for title/CTA slides
- Max 5–6 bullet points per slide
- Cards with `border-radius: 16px` (rounded-xl), subtle drop shadow `0px 4px 20px rgba(19,27,46,0.04)`
- Mobile app screenshots should be placed in a phone mockup frame

**Icons:**
- Use **Material Symbols Outlined** (Google) — same as the app
- Key icons: `eco`, `recycling`, `storefront`, `auto_awesome`, `compost`, `cloud_done`, `shopping_cart`, `cleaning_services`, `gavel`
- Icons should be Primary Green (`#006B2C`) or White on green backgrounds
- Filled variant for active/emphasis states, outlined for default

**Illustrations & Imagery:**
- Style: Flat vector or isometric illustrations — vibrant, warm, African-context
- Scenes to depict:
  - Nigerian open-air market stalls with colorful produce (tomatoes, peppers, plantains)
  - A market woman using a smartphone
  - Stacked recyclable materials (PET bottles, aluminum cans, cardboard)
  - Community members sweeping/cleaning a market area
  - A phone screen showing the WasteWise app interface
- Avoid stock photos of Western grocery stores or sterile lab settings
- If using AI image generation, prompt: *"Flat vector illustration of a Nigerian market woman in colorful ankara wrapper using a smartphone at a vibrant open-air market stall with tomatoes and plantains, warm green and gold color palette, clean modern style"*

**Charts & Data Visualization:**
- Use Primary Green (`#006B2C`) for positive metrics, Error Red (`#BA1A1A`) for waste/loss
- Tertiary Gold (`#735C00`) for financial figures
- Rounded bar charts preferred over line charts
- Donut charts for percentage breakdowns
- Always label directly on chart — no separate legends

**Slide Transitions:**
- Subtle fade or slide-left — no flashy animations
- Cards can "lift in" with a slight upward motion (matches the app's slide-up toast animation)

### Slide Background Patterns

| Slide Type | Background |
|------------|------------|
| Title / CTA | Green gradient (`#006B2C` → `#00873A`) with white text |
| Problem | Dark navy (`#131B2E`) with red accent highlights |
| Solution / Features | White (`#FAF8FF`) with green accent cards |
| Stats / Numbers | Off-white (`#FAF8FF`) with large green stat numbers |
| Tech / Architecture | Light surface (`#EAEDFF`) with monospace code blocks |
| Impact / SDG | White with green + gold accent icons |
| Demo | App screenshot on white/light background in phone mockup |

---

## Slide 1: Title

> **BG:** Green gradient (`#006B2C` → `#00873A`). White text. Subtle leaf/eco pattern in background at 5% opacity.
> **Layout:** Centered. App logo (green circle with white eco leaf icon) above title. Tagline below in Mint (`#7FFC97`).
> **Illustration:** Small phone mockup in bottom-right showing the marketplace feed screen.

### WasteWise Market
**AI-Powered Waste Reduction for Nigerian Markets**

Turn surplus into savings. Turn waste into wealth.

- Team: [Your Team Name]
- Hackathon: [Event Name]
- Stack: React 19 + Firebase + Claude AI + PWA

---

## Slide 2: The Problem

> **BG:** Dark navy (`#131B2E`). Text in white. Key stats in Error Red (`#BA1A1A`) or bold white.
> **Layout:** Left column = text. Right column = illustration of wilting produce at a market stall, muted/desaturated.
> **Visual accent:** A large "40%" in Manrope Black 72px, Error Red, top-right corner as a dramatic stat.
> **Illustration prompt:** *"Somber flat illustration of rotting tomatoes and plantains at an empty Nigerian market stall, muted warm tones, wilted leaves, slight rain, lonely atmosphere"*

### 40% of Food in Lagos Markets Goes to Waste

- Nigeria loses **$9 billion** worth of food annually to post-harvest waste
- Lagos alone generates **13,000+ tonnes** of waste daily — much of it organic
- Market women lose income when produce spoils before it sells
- No affordable, accessible digital tool exists for informal market vendors
- Waste ends up in drainage channels and landfills, worsening flooding and pollution

> "I threw away three baskets of tomatoes last week. Nobody came to buy."
> — Iya Sade, Mushin Market vendor

---

## Slide 3: Our Solution

> **BG:** White (`#FAF8FF`). Green accent cards for each feature.
> **Layout:** 5 feature cards in a horizontal row (or 2+3 grid on tighter formats). Each card has a Material icon in a green circle, feature name bold, one-line description.
> **Icons per feature:** `storefront` (Marketplace), `add_circle` (Vendor Listing), `auto_awesome` (AI Guide), `recycling` (Recyclables), `cleaning_services` (Cleaning Day)
> **Bottom accent:** Mint green pill badge reading "Works offline as PWA"

### WasteWise Market — 5 Features, 1 Platform

| Feature | What It Does |
|---------|-------------|
| **Marketplace Feed** | Buyers discover discounted surplus produce from local vendors |
| **Vendor Listing** | Vendors list surplus items with AI-suggested discount pricing |
| **AI Disposal Guide** | Identifies waste type and gives step-by-step disposal instructions in local language |
| **Buy Recyclables** | Connects businesses with sorted recyclable materials from Lagos collectors |
| **Cleaning Day Tracker** | Organizes community market cleaning events with real-time sign-ups |

All in one **Progressive Web App** — works on any phone, even offline.

---

## Slide 4: How It Works

> **BG:** White. Three columns (or vertical sections on mobile).
> **Layout:** Each user flow in a distinct card with a different top accent color:
>   - Vendors = Primary Green top border
>   - Buyers = Tertiary Gold top border
>   - Environment = Mint Green top border
> **Visual:** Numbered steps (1-2-3-4) with connecting arrows/lines between them. Each step has a small icon.
> **Illustration prompt:** *"Simple 4-step flow diagram showing: camera icon → AI sparkle icon → storefront icon → handshake icon, flat vector style, green and gold palette"*

### For Vendors (Sellers)

1. Snap a photo of surplus produce
2. AI suggests optimal discount price based on item, quantity & market conditions
3. Listing goes live instantly on the marketplace
4. Buyers find it, bid or buy — vendor recovers value instead of throwing away

### For Buyers

1. Browse the feed — all items are surplus, so prices are already low
2. Filter by category (Vegetables, Fruits, Grains, Dairy)
3. Place a bid or buy now
4. Reduce waste while saving money on fresh food

### For the Environment

1. Search any waste type in the Disposal Guide
2. Get Nigerian-specific instructions (not generic Western advice)
3. Find nearby drop-off centers and recyclers
4. Track CO2 offset from every transaction

---

## Slide 5: AI Integration

> **BG:** Light surface (`#EAEDFF`). Two large cards side by side.
> **Layout:** Left card = "Smart Pricing" with a mock input/output example. Right card = "Disposal Intelligence" with search bar mock.
> **Visual accent:** Sparkle icon (`auto_awesome`) in Tertiary Gold next to "Claude AI" label. Show a simplified version of the AI response — input on top in a grey field, output below in a green-bordered card.
> **Bottom quote:** In a green pill callout spanning full width.
> **Illustration prompt:** *"Flat vector of an AI brain/circuit connected to a tomato and a recycling symbol, green and gold wires, clean modern tech illustration"*

### Claude AI Powers Two Core Features

**1. Smart Pricing Engine**
- Input: item name, category, quantity, original price
- Output: suggested discount price + reasoning + CO2 savings estimate
- Example: "200 tomatoes at ₦3,000 → AI suggests ₦1,800 (40% off) — saves 2.4 kg CO2"

**2. Waste Disposal Intelligence**
- 17+ waste types cached locally for instant results (zero latency)
- 60+ aliases for fuzzy matching ("plastic bottles" → "PET bottles")
- AI fallback for unknown waste types via Claude API
- All responses written for Nigerian context: references LAWMA, Wecyclers, RecyclePoints, Pakam

> We don't just tell users "recycle" — we tell them **where** (Owode Onirin scrap market), **how much** they'll earn (₦150–350/kg), and **who** to call.

---

## Slide 6: Tech Architecture

> **BG:** Light surface (`#EAEDFF`). Monospace code font for the diagram.
> **Layout:** Architecture diagram centered. Use colored boxes:
>   - Frontend box = Primary Green border
>   - Firebase boxes = Tertiary Gold border
>   - Vercel/Claude box = Surface variant border
> **Below diagram:** 4 bullet points as pill badges with icons.
> **Visual:** Keep the ASCII diagram but render it as a proper box-and-arrow diagram with rounded corners and the brand colors. Alternatively, use a clean SVG/vector version.

### System Architecture

```
┌─────────────────────────────────────────────┐
│              Frontend (React 19 + PWA)       │
│  ┌─────────┐ ┌──────────┐ ┌──────────────┐  │
│  │ 6 Pages │ │11 Comps  │ │  4 Hooks     │  │
│  └────┬────┘ └─────┬────┘ └──────┬───────┘  │
│       │            │             │           │
│  Tailwind v4 (Material Design 3 tokens)     │
│  Mobile-first responsive (AppShell pattern) │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
   ┌────▼───┐ ┌───▼────┐ ┌──▼──────────┐
   │Firebase│ │Firebase│ │Vercel API   │
   │Firestore│ │Storage│ │Routes       │
   │(real-  │ │(images)│ │(Claude AI   │
   │ time)  │ │        │ │ proxy)      │
   └────────┘ └────────┘ └─────────────┘
```

**Key decisions:**
- **Single responsive app** — no separate mobile/desktop builds
- **Graceful degradation** — sample data fallback when Firebase unavailable
- **PWA** — installable, offline-capable, cached fonts & images
- **Server-side AI proxy** — API key never exposed to client

---

## Slide 7: The Numbers

> **BG:** White (`#FAF8FF`).
> **Layout:** 2x4 grid of stat cards. Each card has a large number in Manrope Black (Primary Green for positive, Tertiary Gold for counts), a label below in Inter Regular, and a small icon.
> **Visual accent:** Numbers should be dramatic — 48–72px font size. Cards have subtle shadows and rounded corners.
> **Illustration:** No illustration needed — the numbers ARE the visual.

| Metric | Value |
|--------|-------|
| Source files | 26 TypeScript/TSX files |
| Pages | 6 (Marketplace, Sell, Recyclables, Guide, Cleaning, Settings) |
| Components | 11 reusable components |
| Custom hooks | 4 (listings, cleaning day, AI pricing, AI disposal) |
| Cached waste types | 17 with 60+ search aliases |
| API routes | 2 serverless functions (pricing + disposal) |
| Build size | ~725 KB (PWA precache) |
| Offline support | Full PWA with Workbox caching |

---

## Slide 8: Market Opportunity

> **BG:** White. Left half = text. Right half = Nigeria map outline with Lagos highlighted in Primary Green, radiating connection dots.
> **Layout:** Stats as bold callouts with supporting text. Target users as 4 icon+label pairs at bottom.
> **Key stat visual:** "174M+" in Manrope Black 64px Primary Green, top-left.
> **Illustration prompt:** *"Minimal flat vector map of Nigeria with Lagos state highlighted in bright green, dots radiating outward representing mobile connections, dark navy background for the map, clean modern style"*

### Why Nigeria? Why Now?

- **174M+ mobile users** in Nigeria — smartphone adoption growing 15% YoY
- **Informal markets** account for 70%+ of food distribution in Lagos
- Government pushing **circular economy** initiatives (LAWMA, EPR regulations)
- Growing **recycling industry**: Wecyclers raised $2M+, RecyclePoints expanding nationally
- **No competitor** targets market women with AI-powered, Pidgin-friendly waste tools

### Target Users
1. **Market vendors** — reduce losses from spoilage
2. **Budget-conscious buyers** — access cheaper surplus produce
3. **Recyclers & collectors** — find and trade sorted materials
4. **Community organizers** — coordinate market cleaning events

---

## Slide 9: Competitive Advantage

> **BG:** White.
> **Layout:** Comparison table with WasteWise column highlighted in green background. Checkmarks (`✓`) in green, crosses (`✗`) in red/grey.
> **Visual accent:** WasteWise column header in a green pill with white text. Other columns in neutral grey.
> **Alternative:** Instead of a table, use a radar/spider chart showing WasteWise covering all axes while competitors cover only 1-2.

### What Makes WasteWise Different

| Feature | WasteWise | Generic Food Apps | Recycling Apps |
|---------|-----------|-------------------|----------------|
| AI pricing for surplus | ✓ | ✗ | ✗ |
| Nigerian Pidgin disposal guide | ✓ | ✗ | ✗ |
| Recyclables marketplace | ✓ | ✗ | Partial |
| Community cleaning tracker | ✓ | ✗ | ✗ |
| Works offline (PWA) | ✓ | Varies | Varies |
| Market women-friendly UI | ✓ | ✗ | ✗ |
| CO2 impact tracking | ✓ | ✗ | Some |

---

## Slide 10: Demo Walkthrough

> **BG:** Light surface (`#EAEDFF`).
> **Layout:** 6 phone mockups in a horizontal row showing each page of the app. Each mockup has a number badge (1-6) and a label below.
> **Visual:** Use actual app screenshots placed inside iPhone/Android mockup frames. If no screenshots available, create simplified wireframe representations matching the app's green + white UI.
> **Tip for AI generators:** Describe each screen:
>   1. Marketplace grid with product cards, green price badges
>   2. Listing form with image upload area, green "Post" button
>   3. Recyclables grid with material icons, green "Order" buttons
>   4. Disposal guide search bar with green "Get Guide" button, result card
>   5. Cleaning day card with progress bar, participant avatars
>   6. Settings list with edit/delete icons

### Live Demo Flow

1. **Home** → Browse marketplace, search for "tomatoes"
2. **Sell** → List surplus plantains, watch AI suggest a discount price
3. **Recyclables** → Browse sorted materials from Lagos collectors
4. **Guide** → Search "pure water sachet" — get local disposal instructions
5. **Cleaning Day** → Join a community cleaning event, see progress bar fill
6. **Settings** → Edit or remove your listings

> Try it on your phone — it's a PWA. Install it right from the browser.

---

## Slide 11: Impact & SDG Alignment

> **BG:** White. Four SDG goal icons in a row across the top (use official UN SDG colored squares: SDG 2 = gold, SDG 11 = amber, SDG 12 = olive, SDG 13 = green).
> **Layout:** SDG row on top, then a divider, then 4 impact stats as large number cards in a row at bottom.
> **Stat card style:** Number in Manrope Black 56px (green for positive metrics), label in Inter below.
> **Illustration prompt:** *"Four icons representing zero hunger (wheat/bowl), sustainable cities (buildings), responsible consumption (infinity loop), climate action (globe with leaf), flat vector, each in their respective SDG color"*

### United Nations Sustainable Development Goals

- **SDG 2 — Zero Hunger**: Reduces food waste, makes surplus food affordable
- **SDG 11 — Sustainable Cities**: Cleaner markets, community-organized cleaning
- **SDG 12 — Responsible Consumption**: AI-guided waste disposal & recycling
- **SDG 13 — Climate Action**: CO2 tracking on every transaction

### Projected Impact (6 months post-launch in 1 Lagos market)
- **500 kg** surplus food rescued from waste weekly
- **200+** market vendors onboarded
- **₦2M+** value recovered from recyclable materials
- **3 tonnes** CO2 offset through proper disposal guidance

---

## Slide 12: Roadmap

> **BG:** White.
> **Layout:** Horizontal 3-phase timeline with a connecting line. Each phase is a card:
>   - Phase 1 (green fill, white text) = "MVP — Current" — checkmarks on all items
>   - Phase 2 (green outline, green text) = "Growth — 3 months"
>   - Phase 3 (dashed green outline, grey text) = "Scale — 6-12 months"
> **Visual accent:** Phase 1 card is largest/most prominent. A "YOU ARE HERE" pin marker on Phase 1.
> **Illustration prompt:** *"Horizontal timeline with 3 milestones, first milestone filled in green with a checkmark, second has a green outline, third is dashed, flat clean vector style"*

### Phase 1 — MVP (Current)
- [x] Marketplace feed with bid/buy
- [x] AI-powered vendor listing & pricing
- [x] AI waste disposal guide (17 cached + API fallback)
- [x] Buy recyclables marketplace
- [x] Community cleaning day tracker
- [x] Settings with listing management
- [x] PWA with offline support

### Phase 2 — Growth (Next 3 months)
- [ ] User authentication & profiles
- [ ] In-app payments (Paystack/Flutterwave)
- [ ] Push notifications for price drops & cleaning events
- [ ] Vendor verification badges
- [ ] Expand to 5 Lagos markets

### Phase 3 — Scale (6–12 months)
- [ ] Image recognition for waste identification (snap & sort)
- [ ] Rider/logistics integration for delivery
- [ ] Carbon credit marketplace for businesses
- [ ] Expand to Ibadan, Abuja, Port Harcourt

---

## Slide 13: Business Model

> **BG:** White.
> **Layout:** 5 revenue cards arranged in a pyramid or grid (2-2-1). Each card has a Tertiary Gold icon, revenue stream name in bold, model description, and estimated figure.
> **Visual accent:** Use Naira sign (₦) prominently in Tertiary Gold for pricing figures. A small "Revenue Potential" donut chart in the corner showing proportional breakdown.
> **Icons per stream:** `payments` (Transaction), `star` (Premium), `recycling` (Bulk), `eco` (Carbon), `analytics` (Data)

### Revenue Streams

| Stream | Model | Est. Revenue |
|--------|-------|-------------|
| Transaction fee | 2-5% per marketplace sale | ₦50–150 per order |
| Premium vendor listing | Boosted visibility for ₦500/week | Subscription |
| Recyclable bulk orders | Commission on B2B transactions | 3% per deal |
| Carbon credit aggregation | Sell verified offsets to corporates | Long-term |
| Data insights | Market waste analytics for LAWMA/NGOs | Enterprise |

---

## Slide 14: The Team

> **BG:** Light surface (`#EAEDFF`).
> **Layout:** Team member cards in a row. Each card has a circular avatar placeholder (green circle with initials if no photo), name, role, and a one-line contribution.
> **Visual accent:** Green underline below each name. Tech stack logos row at the bottom (React, TypeScript, Tailwind, Firebase, Claude, Vite).
> **Logo style:** Use official tech logos at ~24px height, greyscale or colored, evenly spaced.

### [Your Team Name]

| Role | Name | Contribution |
|------|------|-------------|
| Full-stack Dev | [Name] | React, Firebase, API routes |
| AI/Backend | [Name] | Claude AI integration, disposal cache |
| Design/UX | [Name] | Material Design 3, responsive layout |
| Research | [Name] | Nigerian market context, user personas |

**Built with:** React 19 + TypeScript + Tailwind CSS v4 + Firebase + Claude AI + Vite + PWA

---

## Slide 15: Call to Action

> **BG:** Green gradient (`#006B2C` → `#00873A`), same as title slide. White text. Full-bleed.
> **Layout:** Centered. Large tagline in Manrope Black. Three quote lines in italic Mint (`#7FFC97`). Links as white pill buttons at the bottom.
> **Visual:** Faint background pattern of recycling symbols, leaves, and market produce silhouettes at 3-5% opacity.
> **Illustration prompt:** *"Uplifting flat vector illustration of diverse Nigerian people (market women, youth, children) holding hands around a green recycling symbol, warm green and gold tones, community feeling, celebration"*

### WasteWise Market

**Waste is only waste if you waste it.**

- Live demo: [your-vercel-url.vercel.app]
- GitHub: [your-repo-url]
- Contact: [your-email]

> Every tomato saved is a meal served.
> Every sachet recycled is a drainage unclogged.
> Every cleaning day is a community strengthened.

**Let's build a cleaner, wealthier Nigeria — one market at a time.**
