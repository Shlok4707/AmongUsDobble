const TONES = {
  red: 'bg-[#C51111] border-[#7A0838] hover:bg-[#D92020]',
  blue: 'bg-[#1F5FD0] border-[#0C2C74] hover:bg-[#2A72E8]',
  green: 'bg-[#16A34A] border-[#0A5B28] hover:bg-[#1BBE58]',
  slate: 'bg-[#2C3E63] border-[#141F38] hover:bg-[#38507E]',
  amber: 'bg-[#F0A81C] border-[#9A6205] hover:bg-[#FFBB33]',
}

const SIZES = {
  md: 'rounded-[1.6vmin] border-[0.5vmin] px-[4.5vmin] py-[2vmin] text-[2.6vmin]',
  sm: 'rounded-[1.3vmin] border-[0.4vmin] px-[3.2vmin] py-[1.5vmin] text-[2.1vmin]',
}

/**
 * The chunky Among Us style button: thick dark border, hard drop shadow,
 * presses down on click.
 *
 * Sized in `vmin` — a percentage of the viewport's shorter side — so it stays
 * proportionate on a small laptop and on an ultrawide monitor alike.
 */
export default function ChunkyButton({
  children,
  onClick,
  tone = 'blue',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'relative inline-flex items-center justify-center gap-[1.2vmin] select-none',
        'font-black uppercase tracking-[0.12em] text-white',
        'shadow-[0_0.9vmin_0_0_rgba(0,0,0,0.5)] transition-all duration-100',
        'active:translate-y-[0.8vmin] active:shadow-none',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0',
        SIZES[size] || SIZES.md,
        TONES[tone] || TONES.blue,
        className,
      ].join(' ')}
      style={{ textShadow: '0 0.25vmin 0 rgba(0,0,0,0.45)' }}
      {...rest}
    >
      {children}
    </button>
  )
}
