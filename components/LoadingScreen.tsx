export default function LoadingScreen() {
  return (
    <div role="status" aria-label="Loading 3D model" className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-navy">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/70 border-t-royal" />
      <span className="text-xs font-semibold tracking-[0.3em]">LOADING</span>
    </div>
  );
}
