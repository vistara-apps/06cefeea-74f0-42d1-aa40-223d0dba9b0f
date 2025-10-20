'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { UserHolding } from '@/lib/types';

interface PortfolioInputFormProps {
  onAddHolding: (holding: UserHolding) => void;
}

export function PortfolioInputForm({ onAddHolding }: PortfolioInputFormProps) {
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!tokenSymbol.trim()) {
      setError('Please enter a token symbol');
      return;
    }

    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    onAddHolding({
      id: `${Date.now()}-${Math.random()}`,
      tokenSymbol: tokenSymbol.trim().toUpperCase(),
      quantity: qty,
    });

    setTokenSymbol('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-lg p-6 card-shadow space-y-4">
      <h2 className="text-xl font-bold text-fg">Add Token</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="tokenSymbol" className="block text-sm text-fg/70 mb-2">
            Token Symbol
          </label>
          <input
            id="tokenSymbol"
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            placeholder="e.g., ETH, BTC"
            className="w-full px-4 py-3 bg-bg text-fg rounded-md border border-fg/10 focus:border-primary focus:outline-none transition-smooth"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm text-fg/70 mb-2">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            step="any"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-bg text-fg rounded-md border border-fg/10 focus:border-primary focus:outline-none transition-smooth"
          />
        </div>
      </div>

      {error && (
        <div className="text-danger text-sm">{error}</div>
      )}

      <button
        type="submit"
        className="w-full bg-primary hover:bg-accent text-white font-medium py-3 rounded-md flex items-center justify-center gap-2 transition-smooth"
      >
        <Plus size={20} />
        Add Asset
      </button>
    </form>
  );
}
