import { useState } from 'react'
import Stage from '../components/Stage.jsx'
import BackButton from '../components/BackButton.jsx'
import { useGame } from '../game/GameProvider.jsx'
import { sfx } from '../game/sound.js'
import bg from '../assets/screens/code-created.jpg'

/**
 * Code Created Page.
 * The code stays live for as long as this screen is open. Pressing Back closes
 * the connections and releases it.
 */
export default function CodeCreatedPage() {
  const { code } = useGame()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      sfx.click()
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked — the code is on screen anyway */
    }
  }

  return (
    <Stage bg={bg}>
      <div className="absolute inset-x-0 top-[38vmin] z-20 flex flex-col items-center px-[4vmin]">
        <div className="flex items-center justify-center gap-[2vmin]">
          {(code || '····').split('').map((char, i) => (
            <span
              key={i}
              className="flex h-[16vmin] w-[13vmin] animate-popIn items-center justify-center
                         rounded-[1.8vmin] border-[0.5vmin] border-[#9AD9F5]/70 bg-[#0B1B36]/85
                         text-[9vmin] font-black text-[#9AD9F5]"
              style={{
                animationDelay: `${i * 45}ms`,
                textShadow: '0 0 2.5vmin rgba(154,217,245,0.75)',
                boxShadow: 'inset 0 0 3vmin rgba(154,217,245,0.18)',
              }}
            >
              {char}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={copy}
          disabled={!code}
          className="mt-[3vmin] rounded-[1.3vmin] border-[0.35vmin] border-white/25 bg-white/10
                     px-[3.4vmin] py-[1.5vmin] text-[1.9vmin] font-bold uppercase tracking-[0.15em]
                     text-white/80 transition hover:bg-white/20 disabled:opacity-40"
        >
          {copied ? 'Copied!' : 'Copy code'}
        </button>

        {/*
          No "waiting for the other PC" line here: the artwork already carries
          "WAITING FOR OPPONENT…" across the bottom, and a second copy landed on
          top of the crewmate.
        */}
      </div>

      <BackButton />
    </Stage>
  )
}
