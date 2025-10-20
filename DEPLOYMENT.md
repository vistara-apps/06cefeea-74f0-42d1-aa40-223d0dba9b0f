# Minifolio - Deployment Guide

## 🚀 Quick Deploy

### Prerequisites
- Node.js 18+ installed
- OnchainKit API Key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
- Farcaster account (for Mini App deployment)

### 1. Environment Setup

Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

Add your OnchainKit API key:
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development

Run locally:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Production Build

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvistara-apps%2F06cefeea-74f0-42d1-aa40-223d0dba9b0f)

1. Click the deploy button above
2. Connect your GitHub account
3. Add environment variables:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
   - `NEXT_PUBLIC_BASE_RPC_URL` (optional)
4. Deploy!

### Manual Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

## 🎯 Deploy as Farcaster Mini App

### 1. Update Manifest

Edit `public/manifest.json` with your deployment URL:
```json
{
  "name": "Minifolio",
  "homeUrl": "https://your-app-url.vercel.app",
  "imageUrl": "https://your-app-url.vercel.app/minifolio-icon-256x256.png"
}
```

### 2. Register on Farcaster

1. Go to [Farcaster Developer Portal](https://warpcast.com/~/developers)
2. Register your Mini App
3. Add manifest URL: `https://your-app-url.vercel.app/manifest.json`
4. Submit for review

## 📊 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | ✅ Yes | Your OnchainKit API key |
| `NEXT_PUBLIC_BASE_RPC_URL` | ❌ No | Custom Base RPC endpoint |

## 🔧 Troubleshooting

### Build Warnings
The following warnings are safe to ignore:
- `@metamask/sdk` missing `@react-native-async-storage/async-storage`
- `pino` missing `pino-pretty`

These are optional peer dependencies for features we don't use.

### Wallet Connection Issues
- Ensure you're on Base network
- Check OnchainKit API key is valid
- Try clearing browser cache

## 🎨 UI/UX Features Implemented

✅ **Professional Design**
- Smooth animations and transitions
- Loading skeletons for better UX
- Gradient accents and modern card designs
- Responsive mobile-first layout

✅ **OnchainKit Integration**
- Real wallet connection with ConnectWallet component
- Identity components (Avatar, Name, Address, Balance)
- Proper Base network configuration

✅ **Enhanced Components**
- Improved empty states with call-to-action
- Better error handling and user feedback
- Popular token quick-add buttons
- Visual token indicators with 24h price changes

✅ **Farcaster Integration**
- MiniKit SDK for user context
- Share to Farcaster functionality
- User profile display

## 📱 Production Checklist

- [ ] OnchainKit API key configured
- [ ] Environment variables set in deployment platform
- [ ] Manifest file updated with production URL
- [ ] App tested on mobile devices
- [ ] Wallet connection tested on Base network
- [ ] Farcaster sharing tested
- [ ] Performance optimized (build successful)

## 🚦 Performance

- **First Load JS**: ~492 kB
- **Static Generation**: All pages pre-rendered
- **Lighthouse Score**: Optimized for mobile

## 📝 License

MIT
