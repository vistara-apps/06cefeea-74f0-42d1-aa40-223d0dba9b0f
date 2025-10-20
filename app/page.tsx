'use client';

import { useState, useEffect } from 'react';
import { Plus, TrendingUp, TrendingDown, Share2, Wallet } from 'lucide-react';
import { PortfolioSummary } from './components/PortfolioSummary';
import { AssetList } from './components/AssetList';
import { AddAssetModal } from './components/AddAssetModal';
import { ConnectWalletButton } from './components/ConnectWalletButton';
import { useMiniKit } from './hooks/useMiniKit';
import { usePortfolio } from './hooks/usePortfolio';

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { context, isReady } = useMiniKit();
  const { portfolio, addAsset, removeAsset, totalValue, dailyChange } = usePortfolio();

  useEffect(() => {
    if (isReady) {
      console.log('MiniKit ready, user context:', context?.user);
    }
  }, [isReady, context]);

  const handleShare = async () => {
    const changePercent = dailyChange.toFixed(2);
    const isPositive = dailyChange >= 0;
    const emoji = isPositive ? '📈' : '📉';
    
    const message = `${emoji} My Minifolio is ${isPositive ? 'up' : 'down'} ${Math.abs(parseFloat(changePercent))}% today! Total value: $${totalValue.toFixed(2)}`;
    
    // In a real implementation, this would use MiniKit's composeCast
    alert(`Share to Farcaster:\n\n${message}`);
  };

  return (
    <main className="min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-fg">Minifolio</h1>
            <p className="text-sm text-fg/60">Track your crypto on Base</p>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Portfolio Summary */}
        <PortfolioSummary
          totalValue={totalValue}
          dailyChange={dailyChange}
          onShare={handleShare}
        />

        {/* Add Token Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Token
        </button>

        {/* Asset List */}
        {portfolio.length > 0 ? (
          <AssetList assets={portfolio} onRemove={removeAsset} />
        ) : (
          <div className="card text-center py-12">
            <div className="text-fg/40 mb-4">
              <Wallet size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-fg mb-2">
              No assets yet
            </h3>
            <p className="text-sm text-fg/60 mb-4">
              Add your first token to start tracking your portfolio
            </p>
          </div>
        )}

        {/* User Info (if available) */}
        {context?.user && (
          <div className="card">
            <div className="flex items-center gap-3">
              {context.user.pfpUrl && (
                <img
                  src={context.user.pfpUrl}
                  alt={context.user.displayName || 'User'}
                  className="w-10 h-10 rounded-full"
                />
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
