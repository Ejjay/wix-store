export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-1 w-full animate-loading-line bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />
    </div>
  );
}