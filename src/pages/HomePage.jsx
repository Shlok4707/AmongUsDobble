import Stage from '../components/Stage.jsx'
import ChunkyButton from '../components/ChunkyButton.jsx'
import { useGame } from '../game/GameProvider.jsx'
import { TOTAL_ROUNDS } from '../game/engine.js'
import bg from '../assets/screens/home.jpg'

/* eslint-disable no-undef */
const BUILD_STAMP = new Date(__BUILD_TIME__).toISOString().slice(5, 16).replace('T', ' ')

/** Home Page — Create Code / Join Code. */
export default function HomePage() {
  const { goCreateCode, goJoinCodePage, status, statusText, error } = useGame()
  const busy = status === 'creating'

  return (
    <Stage bg={bg}>
      {error && (
        <div className="absolute inset-x-0 top-[4cqmin] z-30 flex justify-center px-[4cqmin]">
          <div className="max-w-[80cqmin] animate-popIn rounded-[1.6cqmin] border-[0.4cqmin] border-[#7A0838] bg-[#C51111]/95 px-[3.5cqmin] py-[2cqmin] text-center text-[2.1cqmin] font-bold text-white">
            {error}
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-[6cqmin] z-20 flex flex-col items-center gap-[3cqmin] px-[4cqmin]">
        <div className="flex flex-wrap items-center justify-center gap-[5cqmin]">
          <ChunkyButton tone="red" onClick={goCreateCode} disabled={busy}>
            {busy ? 'Creating…' : 'Create Code'}
          </ChunkyButton>
          <ChunkyButton tone="blue" onClick={goJoinCodePage} disabled={busy}>
            Join Code
          </ChunkyButton>
        </div>

        <div className="max-w-[86cqmin] text-center">
          <p className="text-[2cqmin] font-bold tracking-wide text-white/85">
            {TOTAL_ROUNDS} rounds · First to spot the matching symbol wins the round.
          </p>
          <p className="mt-[1cqmin] text-[1.75cqmin] font-semibold tracking-wide text-white/60">
            The matching symbol appears on both cards — click it on the left card or the right,
            whichever you spot first.
          </p>
          {busy && statusText && (
            <p className="mt-[1.5cqmin] text-[1.6cqmin] font-bold uppercase tracking-[0.2em] text-[#9AD9F5]/80">
              {statusText}
            </p>
          )}
        </div>
      </div>

      {/* Build stamp. If this does not match the version you just unzipped,
          you are looking at an old dev server. */}
      <p className="pointer-events-none absolute bottom-[1cqmin] left-[1.5cqmin] z-40 text-[1.2cqmin] font-bold tracking-widest text-white/25">
        v{__APP_VERSION__} · {BUILD_STAMP}
      </p>
    </Stage>
  )
}
