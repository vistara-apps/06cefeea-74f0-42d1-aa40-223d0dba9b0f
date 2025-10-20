'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-surface rounded-lg p-8 card-shadow text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-danger/20 flex items-center justify-center">
          <AlertCircle size={32} className="text-danger" />
        </div>
        <h2 className="text-2xl font-bold text-fg">Something went wrong!</h2>
        <p className="text-fg/70">
          We encountered an error while loading your portfolio.
        </p>
        <button
          onClick={reset}
          className="w-full bg-primary hover:bg-accent text-white font-medium py-3 rounded-md transition-smooth"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
