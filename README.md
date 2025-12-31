# Good Morning Machine 🎰

A wholesome image vending machine with a mischievous streak. Generate shareable greeting images that are sometimes sweet, sometimes savage, and sometimes... why did I get this?

## 🌟 Features

### Three Distinct Modes

1. **🌼 Wholesome Mode**
   - Genuine, overly sweet greetings
   - Warm colors (yellow, pastel green, sky blue)
   - Flowers, gardens, sunrises, birds
   - Soft rounded UI
   - Perfect for those "Good Morning 🌸" WhatsApp moments

2. **🗿 Deadpan Mode**
   - Sarcastic, disappointing, corporate vibes
   - Muted colors, greys, stark contrast
   - Office motifs, empty spaces
   - Squarer UI, sharper edges
   - For when you want to be... honest

3. **🎰 Blindbox Mode**
   - Surprise! You don't know what you'll get
   - Could be wholesome, deadpan, or lightly roasty
   - Mystery lever with "???" button
   - The joy of the unknown

### Occasions

- Good Morning
- New Year
- Lunar New Year
- Have a Great Day

## 🎨 Design Philosophy

This is **not productivity software**. This is a **joy machine**.

The interface is inspired by:
- Japanese vending machines
- Retro pop illustration
- Playful but clean aesthetics

Each mode has **clear visual differentiation**:
- Background color shifts
- Different button styles
- Mode label always visible
- No ambiguity

## 📁 Project Structure

```
good-morning-machine/
├── app/
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with Tailwind
├── components/
│   └── VendingMachine.tsx # Main vending machine component
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── next.config.js         # Next.js configuration
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

1. **Choose your mode** - Wholesome, Deadpan, or Blindbox
2. **Select an occasion** (hidden for Blindbox mode)
3. **Click Generate** (or "Pull Lever" for Blindbox)
4. **Download** your greeting image

### Image Output

- **1080x1080px** (Instagram/WhatsApp friendly)
- **Centered content** with clear hierarchy
- **Large, legible text** optimized for mobile
- **One main message** (low cognitive load)
- **No UI chrome** inside the image

## 🛠️ Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 Canvas** - For image generation

## 📝 Key Components

### `VendingMachine.tsx`

The main component that handles:
- Mode selection and visual differentiation
- Occasion selection
- Image generation with mode-specific templates
- Blindbox surprise functionality
- Download functionality

### Mode-Specific Templates

Each mode has its own set of templates with:
- Unique color gradients
- Appropriate emojis and decorations
- Tone-matched copy
- Visual styling that matches the mode's personality

## 🎨 Customization

The templates are easily customizable in `VendingMachine.tsx`:
- Add new occasions
- Modify greeting text
- Adjust color gradients
- Add more decorations

## 🚢 Deployment

This project is optimized for **Vercel** deployment:

```bash
npm run build
```

Then deploy to Vercel for instant hosting.

## 📄 License

This is a fun, unserious project. Use it however you like!

---

**Remember:** This is not productivity software. This is a joy machine. 🌅✨
