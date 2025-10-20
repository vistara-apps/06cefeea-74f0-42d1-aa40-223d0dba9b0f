'use client';

import { Wallet } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="bg-surface rounded-lg p-12 card-shadow text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
        <Wallet size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-bold text-fg">No Holdings Yet</h3>
      <p className="text-fg/70 max-w-sm mx-auto">
        Start tracking your crypto portfolio by adding your first token above.
      </p>
    </div>
  );
}
