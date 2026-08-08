export function StarDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-10">
      <span className="h-px w-16 bg-primary/20" />
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary/70">
        <path
          d="M12 20.5s-7.5-4.6-7.5-9.7A4.3 4.3 0 0 1 12 8.2a4.3 4.3 0 0 1 7.5 2.6c0 5.1-7.5 9.7-7.5 9.7z"
          fill="currentColor"
        />
      </svg>
      <span className="h-px w-16 bg-primary/20" />
    </div>
  );
}
