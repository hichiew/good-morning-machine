// lib/prompt.ts
import type { Mode } from "./theme";

export type Occasion =
  | "good-morning"
  | "have-a-great-day"
  | "new-year"
  | "birthday";

  const GLOBAL_STYLE = `
  Create a low-quality WhatsApp-forward style greeting card image.
  
  Look & quality:
  - Use a REALISTIC stock-photo style background (nature / flowers / animals / sunrise / balloons / cake) — NOT cartoon, NOT illustration.
  - Low resolution feel: visible JPEG compression, a bit blurry, oversaturated colors, slightly blown highlights.
  - Add subtle cheap edits: soft vignetting, fake bokeh, mild lens flare (optional).
  - The composition should look like someone edited it quickly on a phone in 2012.
  
  Text must be embedded in the image:
  - Use SERIF fonts similar to Times New Roman / Georgia, sometimes mixed with a cursive/script font.
  - Inconsistent typography on purpose: weird kerning, mismatched sizes, awkward line breaks.
  - Text should be smaller relative to the photo (don’t dominate the whole image).
  - Add cheesy WordArt styling: white outline, drop shadow, glow (one or two effects max).
  - Subtext must always be readable and real english words, no gibberish.
  - Subtext should have a maximum of 4 words
  
  Avoid:
  - Cartoon style, vector flat poster style, anime style.
  - Perfect modern graphic design.
  `.trim()
  
 

const ASPECT: Record<"square" | "story", string> = {
  square: "Aspect ratio: 1:1 square.",
  story: "Aspect ratio: 9:16 vertical (phone story).",
};

// Mode “flavour”
const MODE_STYLE: Record<Mode, string> = {
  default: `
Mode: DEFAULT (wholesome auntie WhatsApp energy)
- warm, sincere, corny, sweet
- flowers, sunrise, gardens, butterflies, cute animals
`.trim(),

//memes: `
//Mode: MEMES
//- subtext is deadpan, understated, roasty, similar to tone of popular memes from the web
//- Times New Roman-ish serif text
//`.trim(),

  blindbox: `
Mode: BLINDBOX (random surprise, sometimes roast)
- unexpected subject + odd choices
- text and subtext should be mostly roasty and sarcastic
- still looks like a forwarded greeting image
- cannot be hateful
`.trim(),
};

// Occasion “content”
const OCCASION_CONTENT: Record<Occasion, string> = {
  "good-morning": `
Occasion: Good Morning
Image subject: yellow flowers OR sunrise OR garden scene OR coffee OR breakfast on simple background.
Text rules:
- MUST only include the anchor phrase: "Good Morning"
`.trim(),

  "have-a-great-day": `
Occasion: Have a Great Day
Image subject: simple cheerful scene (sun, sky, flowers) OR other cute animals.
Text rules:
- MUST only include the anchor phrase: "Have a Great Day"
`.trim(),

  "new-year": `
Occasion: New Year
Image subject: fireworks, confetti, simple celebratory icons.
Text rules:
- MUST only include the anchor phrase: "Happy New Year"
`.trim(),

  "birthday": `
Occasion: Birthday
Image subject: cake with candles, confetti, simple party vibe.
Text rules:
- MUST only include the anchor phrase: "Happy Birthday"
`.trim(),
};

type PhraseBank = {
  anchor: string
  extras: string[]
}

const PHRASES: Record<Mode, Record<Occasion, PhraseBank>> = {
  default: {
    "good-morning": {
      anchor: "Good Morning",
      extras: [
        "Have A Nice Day",
        "Stay Blessed",
        "Smile Today",
        "Wishing You Peace",
        "Good Vibes Only",
        "Be Happy Always",
        "Take Care",
      ],
    },
    "have-a-great-day": {
      anchor: "Have A Great Day",
      extras: [
        "You Can Do It",
        "Keep Going",
        "Make Today Count",
        "Stay Strong",
        "Sending Good Energy",
        "Don’t Forget To Smile",
      ],
    },
    "new-year": {
      anchor: "Happy New Year",
      extras: [
        "Wishing You Joy",
        "Best Wishes",
        "Health & Happiness",
        "New Year New Blessings",
        "Cheers To 2026",
        "May All Dreams Come True",
      ],
    },
 
    birthday: {
      anchor: "Happy Birthday",
      extras: [
        "Have A Wonderful Day",
        "Wishing You Happiness",
        "Stay Young Always",
        "Many Happy Returns",
        "Enjoy Your Special Day",
      ],
    },
  },

  //memes: {
    //"good-morning": {
      //anchor: "Good Morning.",
      //extras: [
      //  "Proceed.",
      //  "You Are Awake.",
      //  "This Is Fine.",
      //  "Try Again Tomorrow.",
      //  "Another Day Achieved.",
      //],
    //},
    //"have-a-great-day": {
     // anchor: "Have A Great Day.",
     // extras: ["Or Don’t.", "Noted.", "Circle Back Later.", "Per My Last Email."],
    //},
    //"new-year": {
      //anchor: "Happy New Year.",
     // extras: [
      //  "Time Continues.",
      //  "Please Reboot Yourself.",
      //  "Same Problems, New Calendar.",
      //  "Let’s Sync Offline.",
     // ],
   // },
    
   // birthday: {
     // anchor: "Happy Birthday.",
     // extras: ["Time Continues.", "Aging: Confirmed.", "Enjoy This Milestone."],
    //},
  //},

  blindbox: {
    "good-morning": {
      anchor: "Good Morning",
      extras: [
        "Surprise!",
        "Plot Twist Incoming",
        "Today Feels Suspicious",
        "Good Luck, Bestie",
      ],
    },
    "have-a-great-day": {
      anchor: "Have A Great Day",
      extras: ["No Guarantees", "May The Odds Be Kind", "Chaos But Cute"],
    },
    "new-year": {
      anchor: "Happy New Year",
      extras: ["New Year, New Plot", "Unlocking Side Quest", "Level Up? Maybe."],
    },

    "birthday": {
      anchor: "Happy Birthday",
      extras: ["Boss Fight Unlocked", "Achievement: Older", "Cake.exe Running"],
    },
  },
}

function pickExtras(extras: string[], count: number) {
  const shuffled = [...extras].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Optional: tone tweak per mode for the embedded text
function maybeOverrideText(mode: Mode, occasion: Occasion) {
 // if (mode === "memes") {
    //if (occasion === "good-morning") {
     // return `"Good Morning.
//Proceed."`;   
    //}
   // if (occasion === "have-a-great-day") {
     // return `"Have A Great Day.
//Or Don’t."`;
    //}
   // if (occasion === "birthday") {
     // return `"Happy Birthday.
//Time Continues."`;
    //}
   // return `"Noted."`;
  //}

  if (mode === "blindbox") {
    if (occasion === "good-morning") {
      return `"Good Morning.
Surprise!"`;
    }
  }

  return null;
}

export function buildImagePrompt(args: {
  mode: Mode
  occasion: Occasion
  aspect?: "square" | "story"
}) {
  const { mode, occasion, aspect = "square" } = args

  // For blindbox, you can optionally randomize the mode flavour here if you want:
  // const finalMode: Mode = mode === "blindbox" ? (Math.random() < 0.5 ? "default" : "memes") : mode
  const finalMode: Mode = mode

  const bank = PHRASES[finalMode]?.[occasion]
  const anchor = bank?.anchor ?? "Hello"
  const extras = bank?.extras ?? []

  const extraCount = finalMode === "default" ? 2 : 1
  const chosen = pickExtras(extras, extraCount)

  const textBlock = `
Embedded text rules:
- MUST include the anchor line exactly: "${anchor}"
- ALSO include ${chosen.length} extra line(s), choose from these and use them verbatim:
${chosen.map((t) => `- "${t}"`).join("\n")}
- Layout should be awkward but readable (WordArt energy).
- Mix fonts: Times New Roman/Georgia + occasional cursive.
- Keep text smaller relative to the photo.
- Add 1 subtitle that fit the mode + occasion (see phrase bank).
`.trim()

  return `
${GLOBAL_STYLE}

${MODE_STYLE[finalMode]}

${OCCASION_CONTENT[occasion]}

${textBlock}

${ASPECT[aspect]}

Output rules:
- Text must be embedded in the image (no separate caption).
- Realistic stock-photo background (NOT cartoon).
- Keep it simple and fast.
`.trim()
}
