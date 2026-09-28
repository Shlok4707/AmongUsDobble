/**
 * Full-bleed screen backdrop.
 *
 * The background image covers the entire viewport on any device — no letterbox
 * bars, whatever the screen's shape. This is done purely in CSS
 * (`object-fit: cover` on a `position: fixed; inset: 0` image), with no
 * JavaScript measuring the window and no resize listeners: the browser keeps
 * it correct through window resizes, zoom, rotation and full-screen for free.
 *
 * Everything laid on top is positioned against the VIEWPORT rather than
 * against the image, which is what keeps controls reachable and centred on any
 * screen: the artwork may be cropped at the edges, but the UI never is.
 *
 * Children size themselves in `vmin` — a percentage of the viewport's SHORTER
 * side. That scales type sensibly on a 4:3 laptop and on an ultrawide alike,
 * unlike `vw`, which makes text absurd on very wide screens.
 */
export default function Stage({ bg, children, position = 'center', dim = 0 }) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#070B16]">
      <img
        src={bg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />

      {dim > 0 && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `rgba(4, 8, 20, ${dim})` }}
        />
      )}

      {children}
    </div>
  )
}
