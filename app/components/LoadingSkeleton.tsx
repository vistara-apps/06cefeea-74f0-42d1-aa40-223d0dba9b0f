'use client';

export function PortfolioSummarySkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-4 w-32 bg-surface/50 rounded mb-2"></div>
          <div className="h-10 w-40 bg-surface/50 rounded"></div>
        </div>
        <div className="w-10 h-10 bg-surface/50 rounded-lg"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-surface/50 rounded"></div>
        <div className="h-6 w-20 bg-surface/50 rounded"></div>
        <div className="h-4 w-16 bg-surface/50 rounded"></div>
      </div>
    </div>
  );
}

export function AssetListSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-6 w-32 bg-surface/50 rounded skeleton"></div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="card animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-16 bg-surface/50 rounded"></div>
                <div className="h-4 w-24 bg-surface/50 rounded"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-20 bg-surface/50 rounded"></div>
                <div className="h-4 w-24 bg-surface/50 rounded"></div>
              </div>
            </div>
            <div className="w-10 h-10 bg-surface/50 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
