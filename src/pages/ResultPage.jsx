import Stage from '../components/Stage.jsx'
import ChunkyButton from '../components/ChunkyButton.jsx'
import { useGame } from '../game/GameProvider.jsx'
import { pointsFor } from '../game/engine.js'

/**
 * Shared layout for the Winner, Lost and Draw pages.
 *
 * The artwork on these screens sits on the LEFT, so the score panel and the
 * button live on the RIGHT half where the background is empty sky. The image
 * is anchored left so the crewmate stays in frame however the screen is
 * cropped.
 */
export default function ResultPage({ bg, tone, caption, buttonTone, outcome }) {
  const { myScore, opponentScore, totalRounds, goHome } = useGame()

  const points = pointsFor(myScore, outcome === 'win')

  const tones = {
    win: 'border-[#0A5B28] bg-[#08210F]/85 text-[#50EF39]',
    lose: 'border-[#7A0838] bg-[#230910]/85 text-[#FF8080]',
    draw: 'border-[#9A6205] bg-[#241A07]/85 text-[#F0A81C]',
  }

  return (
    <Stage bg={bg} position="left center">
      {/*
        The result itself is painted into the background image, which means a
        screen reader — and anything else that cannot see — would have no idea
        who won. This states it in text.
      */}
      <h1 className="sr-only-focusable absolute" data-result={outcome}>
        {outcome === 'win' ? 'You won' : outcome === 'lose' ? 'You lost' : "It's a draw"}
      </h1>
      <div className="absolute inset-y-0 right-0 z-20 flex w-[min(46vw,60cqmin)] flex-col items-center justify-center gap-[2.6cqmin] px-[4cqmin]">
        <div
          className={`w-full animate-popIn rounded-[2cqmin] border-[0.5cqmin] px-[4cqmin] py-[2.4cqmin] text-center backdrop-blur-sm ${tones[tone]}`}
        >
          <div className="text-[1.7cqmin] font-bold uppercase tracking-[0.3em] text-white/55">
            Rounds won
          </div>
          <div className="text-[7.5cqmin] font-black leading-none">
            {myScore}
            <span className="text-white/35"> / {totalRounds}</span>
          </div>
          <div className="mt-[1.5cqmin] text-[2cqmin] font-semibold text-white/60">
            Opponent won {opponentScore}
          </div>
          {caption && (
            <div className="mt-[1cqmin] text-[1.8cqmin] font-bold uppercase tracking-[0.2em] text-white/45">
              {caption}
            </div>
          )}
        </div>

        {/* Points, directly under the rounds box, as asked. Only the winner
            scores; the loser's panel deliberately still shows a 0 rather than
            being hidden, so the screen reads the same way for both players. */}
        <div
          className={`w-full animate-popIn rounded-[2cqmin] border-[0.5cqmin] px-[4cqmin] py-[2.4cqmin] text-center backdrop-blur-sm ${tones[tone]}`}
          style={{ animationDelay: '120ms' }}
        >
          <div className="text-[1.7cqmin] font-bold uppercase tracking-[0.3em] text-white/55">
            Points won
          </div>
          <div className="text-[6.5cqmin] font-black leading-none">{points.toLocaleString()}</div>
        </div>

        <ChunkyButton tone={buttonTone} onClick={goHome}>
          Go Back to Home Screen
        </ChunkyButton>
      </div>
    </Stage>
  )
}
