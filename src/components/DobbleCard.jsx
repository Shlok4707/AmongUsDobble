import { memo } from 'react'
import { toCssBox } from '../game/layout.js'
import { getAspect, getSymbol } from '../game/symbols.js'

/**
 * Card Rendering Logic — spec section 15.
 *
 * CLICKABILITY
 *
 *   - the card itself is `pointer-events-none`, so the disc, its rim, its
 *     drop shadow and every empty gap between symbols are inert
 *   - each symbol is a real <button> covering its whole box, so a click
 *     anywhere on that symbol registers
 *
 * A click on the card background, the gaps between symbols, the page
 * background or the scoreboard still does nothing at all.
 *
 * Note on the box: symbols are packed as non-overlapping circles and each
 * image is drawn as a rectangle inscribed in its circle (see layout.js), so
 * no two buttons can ever overlap. A click is always unambiguous — it belongs
 * to exactly one symbol.
 */

function SymbolButton({ placement, onHit, disabled, state }) {
  const symbol = getSymbol(placement.symbolId)
  const box = toCssBox(placement, getAspect(placement.symbolId))

  if (!symbol) return null

  // A wrong answer lights up red, mirroring the cyan glow a correct one gets,
  // so the feedback reads the same way for both outcomes.
  const stateClass =
    state === 'correct' || state === 'reveal'
      ? 'animate-matchGlow'
      : state === 'wrong'
        ? 'animate-shake animate-wrongGlow'
        : ''

  return (
    <div
      className={`pointer-events-none absolute ${stateClass}`}
      style={{
        left: `${box.left}%`,
        top: `${box.top}%`,
        width: `${box.width}%`,
        height: `${box.height}%`,
        '--rot': `${placement.rotation}deg`,
        transform: `translate(-50%, -50%) rotate(${placement.rotation}deg)`,
      }}
    >
      {(state === 'wrong' || state === 'correct' || state === 'reveal') && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '150%',
            height: '150%',
            background:
              state === 'wrong'
                ? 'radial-gradient(circle, rgba(255,45,45,0.55) 0%, rgba(255,45,45,0) 68%)'
                : 'radial-gradient(circle, rgba(56,254,220,0.5) 0%, rgba(56,254,220,0) 68%)',
          }}
        />
      )}

      {/*
        A real <button>, not an image with a click handler. It fills the whole
        symbol box, so anywhere on the symbol counts, and it brings keyboard
        activation, focus rings and the right semantics for free.
      */}
      <button
        type="button"
        onClick={() => !disabled && onHit(placement.symbolId)}
        disabled={disabled}
        aria-label={symbol.label}
        className={[
          'pointer-events-auto block h-full w-full border-0 bg-transparent p-0',
          disabled ? 'cursor-default' : 'cursor-pointer',
        ].join(' ')}
      >
        <img
          src={symbol.src}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={[
            // The image never reacts to the pointer itself — the button does.
            // No hover scaling: symbols used to grow and shrink under the
            // cursor, which made them feel like they were dodging the click.
            'pointer-events-none h-full w-full select-none object-contain',
            'transition-transform duration-150',
            state === 'reveal' || state === 'correct' ? 'scale-110' : '',
          ].join(' ')}
          style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.45))' }}
        />
      </button>
    </div>
  )
}

/**
 * `onMiss` is still accepted so callers need no change, but nothing calls it
 * any more: with the whole symbol box clickable there is no such thing as
 * clicking a symbol and missing it.
 */
function DobbleCard({ layout, onHit, onMiss, disabled = false, revealId = null, feedback = null, label }) {
  void onMiss

  return (
    <div
      className="pointer-events-none relative aspect-square w-full animate-cardIn rounded-full
                 border-[0.55vw] border-[#0B1220] bg-gradient-to-b from-[#F3F7FF] to-[#C9D8EE]"
      style={{ boxShadow: '0 0.8vw 0 rgba(0,0,0,0.45), inset 0 0 2vw rgba(0,0,0,0.12)' }}
      aria-label={label}
    >
      {/* Inner rim — decorative only, never clickable. */}
      <div className="pointer-events-none absolute inset-[1.6%] rounded-full border-[0.2vw] border-black/10" />

      {layout.map((placement) => {
        let state = null
        if (revealId !== null && placement.symbolId === revealId) state = 'reveal'
        else if (feedback && feedback.symbolId === placement.symbolId) {
          if (feedback.kind === 'wrong') state = 'wrong'
          else if (feedback.kind === 'correct') state = 'correct'
        }

        return (
          <SymbolButton
            key={`${placement.symbolId}-${placement.x.toFixed(2)}`}
            placement={placement}
            onHit={onHit}
            disabled={disabled}
            state={state}
          />
        )
      })}
    </div>
  )
}

export default memo(DobbleCard)