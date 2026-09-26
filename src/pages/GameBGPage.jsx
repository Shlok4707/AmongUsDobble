import { useEffect, useState } from 'react'
import Stage from '../components/Stage.jsx'
import DobbleCard from '../components/DobbleCard.jsx'
import { useGame } from '../game/GameProvider.jsx'
import { PHASE } from '../game/protocol.js'
import bg from '../assets/screens/game-bg.jpg'

/**
 * Game BG Page — the two cards, the scoreboard, and nothing else clickable.
 *
 * Everything here except the symbol images is `pointer-events-none`: the
 * background, the cards, the scoreboard, the round banner. Only artwork inside
 * a card can register an answer.
 *
 * The layout is measured against the SCREEN, not the background art, so the
 * scoreboard sits dead centre and the cards stay as large as will fit on any
 * display. The banner lives in its own band under the cards, so it can never
 * cover a symbol a player is about to click.
 */

/**
 * Card diameter: fill the band between the scoreboard and the banner, but
 * never so wide that the two cards crowd each other on a squarer screen.
 * The row is also centred vertically in that band, so a 4:3 display does not
 * end up with all the artwork pushed to the top and dead space underneath.
 */
const CARD_SIZE = 'min(62vh, 42vw)'

export default function GameBGPage() {
  const { snapshot, role, myScore, opponentScore, clickSymbol, clickedNothing, feedback } = useGame()

  const roundOver = snapshot.phase === PHASE.ROUND_END
  const iWonRound = roundOver && snapshot.roundWinner === role
  const [floaters, setFloaters] = useState([])

  useEffect(() => {
    if (!iWonRound) return
    const id = Date.now()
    setFloaters((f) => [...f, id])
    const t = setTimeout(() => setFloaters((f) => f.filter((x) => x !== id)), 1200)
    return () => clearTimeout(t)
  }, [iWonRound, snapshot.round])

  // Only surface feedback that is still fresh, so a stale shake never leaks
  // into the next round.
  const liveFeedback = feedback && Date.now() - feedback.at < 900 ? feedback : null

  return (
    <Stage bg={bg} dim={0.15}>
      <div className="absolute inset-0 flex flex-col">
        {/* --------------------------------------------- scoreboard ----- */}
        <div className="pointer-events-none flex shrink-0 justify-center px-[3cqmin] pt-[7cqmin]">
          <div className="grid w-[min(94vw,86cqmin)] grid-cols-3 gap-[2.5cqmin]">
            <StatBox label="You" value={myScore} tone="cyan" floaters={floaters} />
            <StatBox
              label="Round"
              value={`${Math.min(snapshot.round + 1, snapshot.totalRounds)} / ${snapshot.totalRounds}`}
              tone="neutral"
            />
            <StatBox label="Opponent" value={opponentScore} tone="red" />
          </div>
        </div>

        {/* ---------------------------------------------------- cards ---- */}
        {/* pt- opens a clear gap under the scoreboard; the cards then centre
            in what is left, so they sit lower without crowding the banner. */}
        <div className="flex min-h-0 flex-1 items-center justify-center gap-[3vw] px-[2vw] pt-[6cqmin]">
          <div style={{ width: CARD_SIZE, height: CARD_SIZE }}>
            <DobbleCard
              label="Card one"
              layout={snapshot.layoutA}
              onHit={clickSymbol}
              onMiss={clickedNothing}
              disabled={roundOver}
              revealId={roundOver ? snapshot.matchId : null}
              feedback={liveFeedback}
            />
          </div>
          <div style={{ width: CARD_SIZE, height: CARD_SIZE }}>
            <DobbleCard
              label="Card two"
              layout={snapshot.layoutB}
              onHit={clickSymbol}
              onMiss={clickedNothing}
              disabled={roundOver}
              revealId={roundOver ? snapshot.matchId : null}
              feedback={liveFeedback}
            />
          </div>
        </div>

        {/* -------------------------------------------- round banner ----- */}
        {/* Its own band beneath the cards — never on top of a symbol. */}
        <div className="pointer-events-none flex h-[13cqmin] shrink-0 items-center justify-center px-[4cqmin]">
          {roundOver && (
            <div
              className={[
                'animate-popIn rounded-[1.8cqmin] border-[0.5cqmin] px-[5cqmin] py-[1.8cqmin]',
                'text-[3.4cqmin] font-black uppercase tracking-[0.12em] text-white',
                iWonRound ? 'border-[#0A5B28] bg-[#16A34A]' : 'border-[#7A0838] bg-[#C51111]',
              ].join(' ')}
              style={{ textShadow: '0 0.35cqmin 0 rgba(0,0,0,0.45)' }}
            >
              {iWonRound ? 'You got it!' : 'Opponent got it'}
            </div>
          )}
        </div>
      </div>
    </Stage>
  )
}

/**
 * One scoreboard cell. All three are laid out on an equal three-column grid,
 * so You / Round / Opponent are identical in width and height and the whole
 * row is centred on the screen.
 */
function StatBox({ label, value, tone, floaters = [] }) {
  const tones = {
    cyan: 'border-[#2E7E93] bg-[#0E3A4A]/90 text-[#38FEDC]',
    red: 'border-[#7A0838] bg-[#4A0B18]/90 text-[#FF8080]',
    neutral: 'border-white/25 bg-[#0B1B36]/90 text-white',
  }

  return (
    <div
      className={`relative flex min-h-[9cqmin] flex-col items-center justify-center rounded-[1.4cqmin] border-[0.4cqmin] px-[2cqmin] py-[1.2cqmin] ${tones[tone]}`}
    >
      <div className="text-[1.45cqmin] font-bold uppercase tracking-[0.25em] text-white/55">
        {label}
      </div>
      <div className="text-[3.4cqmin] font-black leading-none">{value}</div>

      {floaters.map((id) => (
        <span
          key={id}
          className="pointer-events-none absolute left-1/2 top-full animate-floatUp text-[3.2cqmin] font-black text-[#50EF39]"
          style={{ textShadow: '0 0 2cqmin rgba(80,239,57,0.8)' }}
        >
          +1
        </span>
      ))}
    </div>
  )
}
