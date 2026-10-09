interface Props {
  number: string
  label: string
  className?: string
}

export default function EyebrowLabel({ number, label, className = '' }: Props) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted ${className}`}
    >
      <span>{number}</span>
      <span className="block h-px w-8 bg-muted" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
