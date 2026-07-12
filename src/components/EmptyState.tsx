import type { LucideIcon } from 'lucide-react'

export default function EmptyState({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 fade-slide-up">
      <div className="pop-in w-14 h-14 rounded-2xl bg-card flex items-center justify-center mb-4">
        <Icon size={24} className="text-tertiary" />
      </div>
      <div className="text-primary font-semibold text-sm">{title}</div>
      {subtitle && <div className="text-secondary text-xs mt-1.5 max-w-[240px]">{subtitle}</div>}
    </div>
  )
}
