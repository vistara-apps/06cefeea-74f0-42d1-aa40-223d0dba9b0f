'use client';

import { Wallet } from 'lucide-react';

export function ConnectWalletButton() {
  const handleConnect = () => {
    // In a real implementation, this would use OnchainKit's ConnectWallet
    alert('Wallet connection coming soon! This will use OnchainKit ConnectWallet component.');
  };

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity duration-200"
    >
      <Wallet size={18} />
      <span className="text-sm font-medium">Connect</span>
    </button>
  );
}
