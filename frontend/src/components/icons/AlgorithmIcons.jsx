function IconBase({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export function CpuIcon() {
  return (
    <IconBase>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M4 9h3M4 15h3M17 9h3M17 15h3M9 4v3M15 4v3M9 17v3M15 17v3" />
    </IconBase>
  );
}

export function MemoryIcon() {
  return (
    <IconBase>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M8 10h2M8 14h2M14 10h2M14 14h2M7 3v3M12 3v3M17 3v3M7 18v3M12 18v3M17 18v3" />
    </IconBase>
  );
}

export function PageIcon() {
  return (
    <IconBase>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v5h5M10 12h6M10 16h6" />
    </IconBase>
  );
}

export function DiskIcon() {
  return (
    <IconBase>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </IconBase>
  );
}

export function DeadlockIcon() {
  return (
    <IconBase>
      <path d="M8 8a4 4 0 0 1 6.8-2.8l1 1M16 16a4 4 0 0 1-6.8 2.8l-1-1" />
      <path d="M16 3v4h-4M8 21v-4h4M8 12h8" />
    </IconBase>
  );
}

export function FileIcon() {
  return (
    <IconBase>
      <path d="M4 6h6l2 2h8v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" />
      <path d="M4 10h16" />
    </IconBase>
  );
}
