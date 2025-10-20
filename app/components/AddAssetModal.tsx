'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (symbol: string, quantity: number) => void;
}

export function AddAssetModal({ isOpen, onClose, onAdd }: AddAssetModalProps) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol || !quantity) return;

    setIsLoading(true);
    try {
      await onAdd(symbol.toLowerCase(), parseFloat(quantity));
      setSymbol('');
      setQuantity('');
      onClose();
    } catch (error) {
      console.error('Error adding asset:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-fg">Add Token</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-bg transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-fg mb-2">
              Token Symbol
            </label>
            <input
              id="symbol"
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="e.g., ETH, BTC, SOL"
              className="input-field w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-fg mb-2">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              step="0.000001"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0.00"
              className="input-field w-full"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Token'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
