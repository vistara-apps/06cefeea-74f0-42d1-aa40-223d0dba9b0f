'use client';

import { Trash2, Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';
import type { UserHolding, CryptoPriceData } from '@/lib/types';

interface AssetListProps {
  holdings: UserHolding[];
  prices: Map<string, CryptoPriceData>;
  onRemove: (id: string) => void;
  onUpdate: (id: string, quantity: number) => void;
}

export function AssetList({ holdings, prices, onRemove, onUpdate }: AssetListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState('');

  const handleEdit = (holding: UserHolding) => {
    setEditingId(holding.id);
    setEditQuantity(holding.quantity.toString());
  };

  const handleSave = (id: string) => {
    const qty = parseFloat(editQuantity);
    if (!isNaN(qty) && qty > 0) {
      onUpdate(id, qty);
    }
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditQuantity('');
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-fg">Your Holdings</h2>
      
      <div className="space-y-2">
        {holdings.map((holding) => {
          const price = prices.get(holding.tokenSymbol.toUpperCase());
          const value = price ? holding.quantity * price.currentPriceUSD : 0;
          const isEditing = editingId === holding.id;

          return (
            <div
              key={holding.id}
              className="bg-surface rounded-lg p-4 card-shadow transition-smooth hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {holding.tokenSymbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-fg">{holding.tokenSymbol}</div>
                      {isEditing ? (
                        <input
                          type="number"
                          step="any"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                          className="w-24 px-2 py-1 bg-bg text-fg text-sm rounded border border-fg/10 focus:border-primary focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <div className="text-sm text-fg/70">{holding.quantity} tokens</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-fg">
                    ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  {price && (
                    <div className="text-sm text-fg/70">
                      ${price.currentPriceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                    </div>
                  )}
                  {!price && (
                    <div className="text-sm text-danger">Price unavailable</div>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleSave(holding.id)}
                      className="flex-1 bg-success hover:bg-success/80 text-white py-2 rounded-md flex items-center justify-center gap-2 transition-smooth"
                    >
                      <Check size={16} />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-fg/10 hover:bg-fg/20 text-fg py-2 rounded-md flex items-center justify-center gap-2 transition-smooth"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(holding)}
                      className="flex-1 bg-primary/20 hover:bg-primary/30 text-primary py-2 rounded-md flex items-center justify-center gap-2 transition-smooth"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => onRemove(holding.id)}
                      className="flex-1 bg-danger/20 hover:bg-danger/30 text-danger py-2 rounded-md flex items-center justify-center gap-2 transition-smooth"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
