import Stage from '../components/Stage.jsx'
import { useGame } from '../game/GameProvider.jsx'
import bg from '../assets/screens/timer.jpg'

/**
 * Game Start Timer Page — 3 → 2 → 1 → START.
 *
 * The countdown is driven by the host: it broadcasts each tick as it fires, so
 * both PCs change number within a few milliseconds of each other regardless of
 * any difference between the machines' clocks.
 */
export default function GameStartTimerPage() {
  const { countdown, status } = useGame()
  const isGo = countdown === 'START'

  return (
    <Stage bg={bg}>
      <div className="pointer-events-none absolute inset-x-0 top-[30vmin] z-20 flex justify-center px-[4vmin]">
        {countdown === null ? (
          <p className="text-[3vmin] font-bold tracking-[0.2em] text-white/70">
            {status === 'connected' ? 'GET READY…' : 'CONNECTING…'}
          </p>
        ) : (
          <span
            key={String(countdown)}
            className={[
              'block animate-countPop text-center font-black leading-none',
              isGo ? 'text-[13vmin] text-[#50EF39]' : 'text-[24vmin] text-white',
            ].join(' ')}
            style={{
              textShadow: isGo
                ? '0 0 4vmin rgba(80,239,57,0.8), 0 0.8vmin 0 rgba(0,0,0,0.5)'
                : '0 0 4vmin rgba(154,217,245,0.7), 0 0.8vmin 0 rgba(0,0,0,0.5)',
            }}
          >
            {isGo ? 'START!' : countdown}
          </span>
        )}
      </div>
    </Stage>
  )
}
