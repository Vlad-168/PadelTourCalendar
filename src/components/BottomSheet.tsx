import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export default function BottomSheet({ open, onClose, title, children }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full bg-surface rounded-t-3xl max-h-[92vh] flex flex-col slide-up">
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mt-3 mb-1 flex-shrink-0" />

        <div className="flex items-center justify-between px-4 py-3 border-b border-muted flex-shrink-0">
          <h2 className="text-base font-bold text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-card flex items-center justify-center text-secondary"
          >
            <X size={15} />
          </button>
        </div>

        <div className="overflow-y-auto scrollbar-none flex-1" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
