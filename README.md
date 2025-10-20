# Minifolio - Farcaster-Native Crypto Portfolio Tracker

A Base Mini App for tracking your crypto portfolio directly within Farcaster.

## Features

- 📊 **Live Portfolio Valuation** - Real-time market prices from CoinGecko
- ✏️ **Simple Asset Management** - Easy add, edit, and remove holdings
- 📈 **Performance Tracking** - 24h change and P&L calculations
- 🎨 **BASE Theme** - Beautiful dark blue design with Base branding
- 📱 **Mobile-First** - Optimized for Farcaster mobile experience

## Tech Stack

- **Next.js 15** with App Router
- **React 19** for modern UI patterns
- **OnchainKit** for Base integration
- **MiniKit** for Farcaster features
- **TypeScript** for type safety
- **Tailwind CSS** for styling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel or any Next.js-compatible platform:

```bash
npm run build
npm start
```

## Future Features

- 🔄 Token swaps with gas sponsorship
- 🖼️ Farcaster Frame generation for sharing
- 🔔 Portfolio change notifications
- 📊 Historical performance charts
- 🏆 Leaderboards and social features

## License

MIT
