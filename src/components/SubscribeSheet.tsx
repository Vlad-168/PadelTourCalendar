import { useState } from 'react'
import { Calendar, Check, Copy } from 'lucide-react'

export default function SubscribeSheet() {
  const [copied, setCopied] = useState(false)

  const icsPath = `${import.meta.env.BASE_URL}calendar.ics`
  const httpsUrl = `${window.location.origin}${icsPath}`
  const webcalUrl = `webcal://${window.location.host}${icsPath}`

  async function copyLink() {
    await navigator.clipboard.writeText(httpsUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-4 space-y-4">
      <p className="text-secondary text-sm leading-relaxed">
        Добавьте календарь в Google Calendar, Apple Calendar или Outlook — все турниры
        появятся у вас в приложении и будут обновляться сами, когда мы добавляем новые.
      </p>

      <a
        href={webcalUrl}
        className="flex items-center justify-center gap-2 bg-accent text-base font-semibold text-sm py-3 rounded-2xl active:scale-[0.98] transition-transform"
      >
        <Calendar size={16} />
        Открыть в приложении календаря
      </a>

      <button
        onClick={copyLink}
        className="w-full flex items-center justify-center gap-2 glass text-primary font-semibold text-sm py-3 rounded-2xl active:scale-[0.98] transition-transform"
      >
        {copied ? <Check size={16} className="text-positive" /> : <Copy size={16} />}
        {copied ? 'Ссылка скопирована' : 'Скопировать ссылку'}
      </button>

      <div className="glass p-3">
        <div className="text-tertiary text-[11px] mb-1">Ссылка для ручного добавления (Google Calendar → «Другие календари» → «По URL»):</div>
        <div className="text-secondary text-xs break-all font-mono">{httpsUrl}</div>
      </div>
    </div>
  )
}
