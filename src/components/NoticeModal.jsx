import { useEffect } from 'react'
import ChunkyButton from './ChunkyButton.jsx'

/**
 * A proper dialog for things the player needs to acknowledge — chiefly the
 * other PC leaving mid-game.
 *
 * This used to be a thin banner that appeared on the Home Page after an abrupt
 * jump, which read like a glitch rather than an explanation. A modal over a
 * dimmed screen makes it clear the game ended and why, and waits for the
 * player instead of vanishing on its own.
 */
export default function NoticeModal({ title = 'Game ended', message, onDismiss }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') onDismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDismiss])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onDismiss} />

      <div className="relative w-[min(92vw,58vmin)] animate-popIn rounded-[2.5vmin] border-[0.6vmin] border-[#1a2547] bg-[#111a33] p-[5vmin] text-center shadow-[0_1.5vmin_0_rgba(0,0,0,0.5)]">
        <div className="mx-auto mb-[2.5vmin] flex h-[11vmin] w-[11vmin] items-center justify-center rounded-full border-[0.5vmin] border-[#7A0838] bg-[#2A0B12]">
          {/* A crewmate with a slash through it — "the other player is gone". */}
          <svg viewBox="0 0 64 64" className="h-[7vmin] w-[7vmin]" aria-hidden="true">
            <path
              d="M18 26c0-9 7-15 15-15s15 6 15 15v22c0 4-2 6-6 6h-4V42c0-3-2-5-5-5s-5 2-5 5v12h-4c-4 0-6-2-6-6z"
              fill="#8394BF"
              stroke="#0B1020"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M11 30c0-4 3-6 6-6h1v20h-1c-3 0-6-2-6-6z"
              fill="#5A6B7B"
              stroke="#0B1020"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M33 21h9c5 0 8 4 8 8s-3 8-8 8h-9c-4 0-6-3-6-6v-4c0-3 2-6 6-6z"
              fill="#3B4A63"
              stroke="#0B1020"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path d="M10 56 54 10" stroke="#0B1020" strokeWidth="9" strokeLinecap="round" />
            <path d="M10 56 54 10" stroke="#FF4D4D" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        <h2 className="text-[3.4vmin] font-black uppercase tracking-[0.12em] text-white">{title}</h2>
        <p className="mx-auto mt-[1.8vmin] max-w-[46vmin] text-[2.2vmin] font-semibold leading-snug text-white/70">
          {message}
        </p>

        <div className="mt-[4vmin]">
          <ChunkyButton tone="blue" onClick={onDismiss} autoFocus>
            Back to Home
          </ChunkyButton>
        </div>
      </div>
    </div>
  )
}
