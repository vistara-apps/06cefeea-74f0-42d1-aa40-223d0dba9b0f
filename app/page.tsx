'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { PortfolioSummary } from './components/PortfolioSummary';
import { AssetList } from './components/AssetList';
import { AddAssetModal } from './components/AddAssetModal';
import { ConnectWalletButton } from './components/ConnectWalletButton';
import { EmptyStateEnhanced } from './components/EmptyStateEnhanced';
import { PortfolioSummarySkeleton, AssetListSkeleton } from './components/LoadingSkeleton';
import { useMiniKit } from './hooks/useMiniKit';
import { usePortfolio } from './hooks/usePortfolio';

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { context, isReady } = useMiniKit();
  const { portfolio, addAsset, removeAsset, totalValue, dailyChange } = usePortfolio();

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
    
    const message = `${emoji} My Minifolio is ${isPositive ? 'up' : 'down'} ${Math.abs(parseFloat(changePercent))}% today! Total value: $${totalValue.toFixed(2)}`;
    
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
        {isInitialLoading ? (
          <>
            <PortfolioSummarySkeleton />
            <div className="h-12 skeleton rounded-lg"></div>
            <AssetListSkeleton />
          </>
        ) : (
          <>
            {/* Portfolio Summary */}
            {portfolio.length > 0 && (
              <PortfolioSummary
                totalValue={totalValue}
                dailyChange={dailyChange}
                onShare={handleShare}
              />
            )}

            {/* Add Token Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Token
            </button>

            {/* Asset List or Empty State */}
            {portfolio.length > 0 ? (
              <AssetList assets={portfolio} onRemove={removeAsset} />
            ) : (
              <EmptyStateEnhanced onAddClick={() => setIsAddModalOpen(true)} />
            )}

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

      {/* Add Asset Modal */}
      <AddAssetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addAsset}
      />
    </main>
  );
}
