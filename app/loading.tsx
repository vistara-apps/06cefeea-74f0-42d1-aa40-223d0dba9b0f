export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-fg/70">Loading Minifolio...</p>
      </div>
    </div>
  );
}
