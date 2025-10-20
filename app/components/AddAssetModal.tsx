'use client';

import { useState } from 'react';
import { X, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (symbol: string, quantity: number) => void;
}

const POPULAR_TOKENS = [
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'USDC', name: 'USD Coin' },
  { symbol: 'DEGEN', name: 'Degen' },
];

export function AddAssetModal({ isOpen, onClose, onAdd }: AddAssetModalProps) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol || !quantity) return;

    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      await onAdd(symbol.toLowerCase(), parseFloat(quantity));
      setSuccess(true);
      setTimeout(() => {
        setSymbol('');
        setQuantity('');
        setSuccess(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error adding asset:', error);
      setError('Failed to add token. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdd = (tokenSymbol: string) => {
    setSymbol(tokenSymbol);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-2xl border border-white/10 slide-up">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-fg">Add Token</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-bg transition-all duration-200 hover:rotate-90"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Popular Tokens */}
          <div>
            <label className="block text-sm font-medium text-fg/80 mb-3">
              Popular Tokens
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TOKENS.map((token) => (
                <button
                  key={token.symbol}
                  type="button"
                  onClick={() => handleQuickAdd(token.symbol)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    symbol.toUpperCase() === token.symbol
                      ? 'bg-accent text-white'
                      : 'bg-bg text-fg/80 hover:bg-accent/10'
                  }`}
                >
                  {token.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Token Symbol Input */}
          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-fg mb-2">
              Token Symbol
            </label>
            <input
              id="symbol"
              type="text"
              value={symbol}
              onChange={(e) => {
                setSymbol(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="e.g., ETH, BTC, SOL"
              className="input-field w-full uppercase"
              required
              disabled={isLoading || success}
            />
          </div>

          {/* Quantity Input */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-fg mb-2">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              step="0.000001"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setError('');
              }}
              placeholder="0.00"
              className="input-field w-full"
              required
              disabled={isLoading || success}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm">
              <CheckCircle2 size={16} />
              <span>Token added successfully!</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
              disabled={isLoading || success}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary flex items-center justify-center gap-2"
              disabled={isLoading || success}
            >
              {isLoading && <Loader2 size={18} className="animate-spin" />}
              {success && <CheckCircle2 size={18} />}
              {isLoading ? 'Adding...' : success ? 'Added!' : 'Add Token'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
