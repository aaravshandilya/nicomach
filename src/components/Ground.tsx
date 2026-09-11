/**
 * The hero surface. everyday.io fills its fold with a photograph of a warm
 * material under raking daylight — the colour on that page is light falling
 * on an object, not a CSS gradient. NicoMach has no product photograph and
 * will not fake one, so the same idea is built honestly: a plane, the wall
 * behind it, and a shaft of window light that breaks at the seam between
 * them the way real light does.
 */
export function Ground({ className = "", flat = false }: { className?: string; flat?: boolean }) {
  const H = 900;
  const SEAM = flat ? 0 : 286;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg className="h-full w-full" viewBox={`0 0 1440 ${H}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* userSpaceOnUse everywhere: these shapes are long and diagonal and a
              bounding-box filter region would clip the blur away entirely. */}
          <filter id="g-soft" x="-400" y="-400" width="2240" height="1700" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <filter id="g-wide" x="-600" y="-600" width="2640" height="2100" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="130" />
          </filter>
          <clipPath id="g-wall"><rect x="0" y="0" width="1440" height={SEAM} /></clipPath>
          <clipPath id="g-floor"><rect x="0" y={SEAM} width="1440" height={H - SEAM} /></clipPath>
        </defs>

        {/* the wall behind, and the plane in front */}
        {!flat && <rect x="0" y="0" width="1440" height={SEAM} fill="#BBA67F" />}
        <rect x="0" y={SEAM} width="1440" height={H - SEAM} fill="#CFBA92" />

        {/* the light on the wall */}
        <g clipPath="url(#g-wall)" style={{ display: flat ? "none" : undefined }}>
          <polygon points="236,-40 548,-40 606,326 294,326" fill="#F6EBD2" opacity="0.5" filter="url(#g-soft)" />
          <polygon points="236,-40 286,-40 344,326 294,326" fill="#FFF9EC" opacity="0.4" filter="url(#g-soft)" />
        </g>

        {/* the same light, sheared where it lands on the plane */}
        <g clipPath="url(#g-floor)">
          {flat ? (
            <>
              <polygon points="-60,-80 252,-80 1010,980 698,980" fill="#F7ECD4" opacity="0.42" filter="url(#g-soft)" />
              <polygon points="-60,-80 -2,-80 756,980 698,980" fill="#FFFAEE" opacity="0.32" filter="url(#g-soft)" />
            </>
          ) : (
            <>
              <polygon points="294,260 606,260 1184,940 872,940" fill="#F7ECD4" opacity="0.5" filter="url(#g-soft)" />
              <polygon points="294,260 352,260 930,940 872,940" fill="#FFFAEE" opacity="0.4" filter="url(#g-soft)" />
            </>
          )}
        </g>

        {/* the seam where the plane meets the wall */}
        {!flat && <rect x="0" y={SEAM - 1} width="1440" height="1.5" fill="#A48D66" opacity="0.5" />}
        {!flat && <rect x="0" y={SEAM} width="1440" height="26" fill="#B49C74" opacity="0.32" filter="url(#g-soft)" />}

        {/* the room falling away either side of the light */}
        <polygon points="-160,940 -160,300 470,940" fill="#8E7749" opacity="0.26" filter="url(#g-wide)" />
        <polygon points="1600,-80 1600,560 1080,-80" fill="#9C8455" opacity="0.2" filter="url(#g-wide)" />
        <rect x="0" y={H - 150} width="1440" height="200" fill="#8E7749" opacity="0.14" filter="url(#g-wide)" />
      </svg>

      <div className="grain absolute inset-0 opacity-80" />
    </div>
  );
}
