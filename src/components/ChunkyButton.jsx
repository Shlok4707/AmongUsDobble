const TONES = {
  red: 'bg-[#C51111] border-[#7A0838] hover:bg-[#D92020]',
  blue: 'bg-[#1F5FD0] border-[#0C2C74] hover:bg-[#2A72E8]',
  green: 'bg-[#16A34A] border-[#0A5B28] hover:bg-[#1BBE58]',
  slate: 'bg-[#2C3E63] border-[#141F38] hover:bg-[#38507E]',
  amber: 'bg-[#F0A81C] border-[#9A6205] hover:bg-[#FFBB33]',
}

const SIZES = {
  md: 'rounded-[1.6cqmin] border-[0.5cqmin] px-[4.5cqmin] py-[2cqmin] text-[2.6cqmin]',
  sm: 'rounded-[1.3cqmin] border-[0.4cqmin] px-[3.2cqmin] py-[1.5cqmin] text-[2.1cqmin]',
}

/**
 * The chunky Among Us style button: thick dark border, hard drop shadow,
 * presses down on click.
 *
 * Sized in `cqmin` — a percentage of the viewport's shorter side — so it stays
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
        'relative inline-flex items-center justify-center gap-[1.2cqmin] select-none',
        'font-black uppercase tracking-[0.12em] text-white',
        'shadow-[0_0.9cqmin_0_0_rgba(0,0,0,0.5)] transition-all duration-100',
        'active:translate-y-[0.8cqmin] active:shadow-none',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0',
        SIZES[size] || SIZES.md,
        TONES[tone] || TONES.blue,
        className,
      ].join(' ')}
      style={{ textShadow: '0 0.25cqmin 0 rgba(0,0,0,0.45)' }}
      {...rest}
    >
      {children}
    </button>
  )
}
