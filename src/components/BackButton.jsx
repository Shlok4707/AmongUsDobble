import ChunkyButton from './ChunkyButton.jsx'
import { useGame } from '../game/GameProvider.jsx'

/**
 * "Back", pinned to the bottom-right of the SCREEN (not of the artwork), so it
 * is always reachable however the background happens to be cropped.
 *
 * Pressing it always terminates the session: the transports are closed, which
 * releases the 4-character code and tells the other PC to leave, so nobody is
 * left waiting on an abandoned game.
 */
export default function BackButton({ label = 'Back' }) {
  const { goHome } = useGame()

  return (
    <div className="absolute bottom-[4vmin] right-[4vmin] z-40">
      <ChunkyButton tone="slate" size="sm" onClick={goHome}>
        <span aria-hidden="true">←</span> {label}
      </ChunkyButton>
    </div>
  )
}
