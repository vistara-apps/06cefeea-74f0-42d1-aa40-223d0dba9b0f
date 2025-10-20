# Minifolio - Farcaster-Native Crypto Portfolio Tracker

A Base Mini App for tracking your crypto portfolio and sharing performance with friends on Farcaster.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvistara-apps%2F06cefeea-74f0-42d1-aa40-223d0dba9b0f)

## ✨ Features

- 📊 **Live Portfolio Valuation** - Track your crypto holdings with real-time prices
- 💼 **Simple Asset Management** - Easy-to-use interface for adding and managing tokens
- 🎯 **Farcaster Integration** - Share portfolio performance directly to your Farcaster feed
- 🔗 **Wallet-Native** - Built with OnchainKit for seamless Base blockchain integration
- 🎨 **Beautiful UI** - Modern, mobile-first design with smooth animations and BASE theme
- ⚡ **Production Ready** - Optimized build with loading states and error handling

## 🎨 UI/UX Improvements

This version includes comprehensive UI/UX enhancements:

✅ **Real OnchainKit Wallet Connection** - Fully integrated ConnectWallet component with Identity features
✅ **Loading States** - Skeleton screens for better perceived performance  
✅ **Smooth Animations** - Fade-in, slide-up, and scale transitions throughout
✅ **Enhanced Empty States** - Engaging onboarding with clear calls-to-action
✅ **Better Error Handling** - User-friendly error messages and states
✅ **Visual Polish** - Gradients, shadows, token avatars, and 24h price changes
✅ **Responsive Design** - Mobile-first with professional spacing and typography

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2 on Ethereum)
- **Wallet**: OnchainKit (@coinbase/onchainkit) v0.38+
- **Social**: Farcaster Mini Apps (@farcaster/miniapp-sdk)
- **Styling**: Tailwind CSS with custom BASE theme
- **State**: React 19 with hooks

## 🏃 Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env.local` file:**
```bash
cp .env.local.example .env.local
```

3. **Add your OnchainKit API key:**
Get your key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📦 Production Build

```bash
npm run build
npm start
```

## 🌐 Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:
- Vercel deployment (recommended)
- Farcaster Mini App setup
- Environment configuration
- Production checklist

## Project Structure

```
minifolio/
├── app/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── types.ts         # TypeScript types
│   ├── providers.tsx    # Context providers
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── public/
│   └── .well-known/
│       └── farcaster.json  # Farcaster manifest
└── package.json
```

## Key Components

- **PortfolioSummary**: Displays total value and daily change
- **AssetList**: Shows all tracked tokens with prices
- **AddAssetModal**: Form for adding new tokens
- **ConnectWalletButton**: Wallet connection (OnchainKit integration)

## Farcaster Integration

This app is designed to run as a Farcaster Mini App with:
- User context access (FID, username, profile)
- Frame generation for sharing
- Composable casts with portfolio snapshots
- Future: Notifications for portfolio changes

## Future Features

- 🔄 Real-time price updates via CoinGecko API
- 💱 In-app token swaps with gas sponsorship
- 📈 Historical performance charts
- 🏆 Leaderboards and social features
- 🔔 Push notifications for significant changes
- 🎨 Custom portfolio themes

## License

MIT
