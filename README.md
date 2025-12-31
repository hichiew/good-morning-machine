# Good Morning Machine 🌅

A simple Next.js website that lets users generate fun greeting images for any occasion.

## Project Structure

```
good-morning-machine/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout (wraps all pages)
│   ├── page.tsx           # Home page (main entry point)
│   └── globals.css        # Global styles with Tailwind
├── components/             # Reusable React components
│   └── GreetingGenerator.tsx  # Main component for generating images
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── next.config.js         # Next.js configuration
```

## What Each File Does

### `/app/layout.tsx`
- This is the root layout that wraps all pages in your app
- Sets up the HTML structure and metadata (title, description)
- All pages will inherit this layout

### `/app/page.tsx`
- This is your home page (the main page users see at `/`)
- Uses the `'use client'` directive because it contains interactive components
- Renders the `GreetingGenerator` component

### `/app/globals.css`
- Global CSS styles for your entire app
- Includes Tailwind CSS directives
- Sets up basic color variables for light/dark mode

### `/components/GreetingGenerator.tsx`
- The main component that handles image generation
- Uses HTML5 Canvas API to draw the greeting images
- Allows users to:
  - Select greeting types (Good Morning, Happy New Year, etc.)
  - Enter custom text
  - Choose background and text colors
  - Generate and download images

### Configuration Files
- `package.json`: Lists all dependencies and npm scripts
- `tsconfig.json`: TypeScript compiler settings
- `tailwind.config.ts`: Tailwind CSS customization
- `next.config.js`: Next.js framework settings

## Getting Started

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

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## How It Works

1. Users select a greeting type or enter custom text
2. They customize colors (background and text)
3. Click "Generate Image" to create the image on a canvas
4. Click "Download Image" to save it as a PNG file

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 Canvas** - For image generation

## Next Steps

You can extend this project by:
- Adding more greeting templates
- Adding image backgrounds or patterns
- Adding fonts selection
- Adding text size controls
- Sharing functionality
- Saving favorites




