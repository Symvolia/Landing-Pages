export default function Loading() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 overflow-hidden" role="status" aria-label="Loading">
      <div className="h-full w-1/3 bg-copper" style={{ animation: "loadbar 1s ease-in-out infinite" }} />
    </div>
  );
}
