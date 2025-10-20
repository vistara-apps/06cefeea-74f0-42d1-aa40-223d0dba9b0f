# Minifolio - Farcaster-Native Crypto Portfolio Tracker

A Base Mini App for tracking your crypto portfolio and sharing performance with friends on Farcaster.

## Features

- 📊 **Live Portfolio Valuation** - Track your crypto holdings with real-time prices
- 💼 **Simple Asset Management** - Easy-to-use interface for adding and managing tokens
- 🎯 **Farcaster Integration** - Share portfolio performance directly to your Farcaster feed
- 🔗 **Wallet-Native** - Built with OnchainKit for seamless Base blockchain integration
- 🎨 **Beautiful UI** - Modern, mobile-first design with BASE theme

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2 on Ethereum)
- **Wallet**: OnchainKit (@coinbase/onchainkit)
- **Social**: Farcaster Mini Apps (@farcaster/miniapp-sdk)
- **Styling**: Tailwind CSS with custom BASE theme
- **State**: React 19 with hooks

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

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
