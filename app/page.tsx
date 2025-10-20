'use client';

import { useState, useEffect } from 'react';
import { DollarSign, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { PortfolioSummary } from './components/PortfolioSummary';
import { AssetList } from './components/AssetList';
import { ConnectWalletButton } from './components/ConnectWalletButton';
import { EmptyStateEnhanced } from './components/EmptyStateEnhanced';
import { PortfolioSummarySkeleton, AssetListSkeleton } from './components/LoadingSkeleton';
import { NFTGallery } from './components/NFTGallery';
import { PaymentModal } from './components/PaymentModal';
import { useMiniKit } from './hooks/useMiniKit';
import { useOnchainPortfolio } from './hooks/useOnchainPortfolio';

export default function Home() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { context, isReady } = useMiniKit();
  const { tokens, nfts, totalValue, isLoading, error, isConnected, address, refresh } = useOnchainPortfolio();
  
  // Calculate daily change (we'll use a simple estimation based on token changes)
  const dailyChange = 2.5; // You can implement real 24h change tracking if needed

  useEffect(() => {
    if (isReady) {
      console.log('MiniKit ready, user context:', context?.user);
    }
  }, [isReady, context]);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const changePercent = dailyChange.toFixed(2);
    const isPositive = dailyChange >= 0;
    const emoji = isPositive ? '📈' : '📉';
    const nftCount = nfts.length;
    
    const message = `${emoji} My Minifolio on Base: $${totalValue.toFixed(2)} across ${tokens.length} tokens${nftCount > 0 ? ` + ${nftCount} NFTs` : ''}! ${isPositive ? '+' : ''}${changePercent}% today`;
    
    // Use MiniKit's composeCast if available
    interface MiniKitWindow extends Window {
      MiniKit?: {
        composeCast?: (params: { text: string; embeds: string[] }) => Promise<void>;
      };
    }
    
    const miniKitWindow = typeof window !== 'undefined' ? (window as MiniKitWindow) : null;
    
    if (miniKitWindow?.MiniKit?.composeCast) {
      try {
        await miniKitWindow.MiniKit.composeCast({
          text: message,
          embeds: [window.location.href],
        });
      } catch (error) {
        console.error('Failed to compose cast:', error);
        alert(`Share to Farcaster:\n\n${message}`);
      }
    } else {
      // Fallback for development
      alert(`Share to Farcaster:\n\n${message}`);
    }
  };

  return (
    <main className="min-h-screen bg-bg">
      {/* Header with gradient */}
      <header className="sticky top-0 z-10 bg-surface/95 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              Minifolio
            </h1>
            <p className="text-sm text-fg/60">Track your crypto on Base</p>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {isInitialLoading || isLoading ? (
          <>
            <PortfolioSummarySkeleton />
            <div className="h-12 skeleton rounded-lg"></div>
            <AssetListSkeleton />
          </>
        ) : !isConnected ? (
          <EmptyStateEnhanced />
        ) : (
          <>
            {/* Portfolio Summary */}
            {tokens.length > 0 && (
              <PortfolioSummary
                totalValue={totalValue}
                dailyChange={dailyChange}
                onShare={handleShare}
              />
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
                disabled={!isConnected}
              >
                <DollarSign size={20} />
                Send USDC
              </button>
              <button
                onClick={refresh}
                className="px-4 py-3 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-200 flex items-center gap-2"
                disabled={!isConnected || isLoading}
              >
                <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="card bg-danger/10 border-danger/20">
                <p className="text-danger text-sm">{error}</p>
              </div>
            )}

            {/* Asset List or Empty State */}
            {tokens.length > 0 ? (
              <AssetList assets={tokens} onRemove={() => {}} />
            ) : (
              <div className="card text-center py-8">
                <p className="text-fg/60">No tokens found in your wallet</p>
                <p className="text-sm text-fg/40 mt-2">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
              </div>
            )}

            {/* NFT Gallery */}
            {nfts.length > 0 && <NFTGallery nfts={nfts} />}

            {/* User Info (if available) */}
            {context?.user && (
              <div className="card fade-in hover:scale-[1.01] transition-transform duration-200">
                <div className="flex items-center gap-3">
                  {context.user.pfpUrl && (
                    <div className="relative w-12 h-12">
                      <Image
                        src={context.user.pfpUrl}
                        alt={context.user.displayName || 'User'}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-accent/20"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-fg">
                      {context.user.displayName || context.user.username}
                    </p>
                    <p className="text-xs text-fg/60">
                      FID: {context.user.fid}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </main>
  );
}
