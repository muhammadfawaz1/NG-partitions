# N&G Partitions Setup Guide

## Environment Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and add your actual values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
- **NEXT_PUBLIC_WEB3FORMS_KEY**: Get your free API key at https://web3forms.com
- **NEXT_PUBLIC_SITE_URL**: Your production domain (https://ngpartitions.co.uk)

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Commands

- **Development**: `npm run dev`
- **Build for production**: `npm run build`
- **Start production server**: `npm run start`
- **Type checking**: `npm run typecheck`
- **Linting**: `npm run lint`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── about/
│   ├── services/
│   ├── projects/
│   └── contact/           # Contact form with Web3Forms integration
├── components/            # Reusable components
│   ├── cards/            # Project & Service cards
│   ├── layout/           # Header & Footer
│   ├── media/            # Image components
│   ├── motion/           # Framer Motion animations
│   ├── sections/         # Page sections
│   └── ui/               # Base UI components
├── data/                 # Static content & data
├── lib/                  # Utility functions
└── app/globals.css       # Global styles

public/
└── assets/               # Images & videos organized by category
```

## Important Security Notes

✅ **Fixed in latest version:**
- API keys now use environment variables (not hardcoded)
- All sensitive configuration is in `.env.local` (not committed to Git)
- Package versions are pinned for reproducible builds

## Performance Optimization

- Images are optimized with AVIF & WebP formats
- Framer Motion respects `prefers-reduced-motion`
- Smooth scrolling only for users who don't prefer reduced motion
- Dynamic imports for code splitting

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
1. Run `npm run build`
2. Set environment variables in your platform
3. Run `npm run start` to start the server

## Troubleshooting

**Build fails with "Cannot find module"?**
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Ensure all files are saved and no import paths are broken

**Contact form not sending emails?**
- Check `.env.local` has valid `NEXT_PUBLIC_WEB3FORMS_KEY`
- Verify key at https://web3forms.com dashboard
- Check browser console for errors

**Images not loading?**
- Ensure image files exist in `public/assets/`
- Check image `alt` text is meaningful
- Verify `sizes` prop on Image components
