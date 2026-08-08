export default function EmbossedTexture({ opacity = 0.045 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity, mixBlendMode: 'overlay' }}
      aria-hidden="true"
    >
      <filter id="emboss-pub">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="27" result="noise" />
        <feDiffuseLighting in="noise" lightingColor="#C9A84C" surfaceScale="1.6" result="light">
          <feDistantLight azimuth="235" elevation="55" />
        </feDiffuseLighting>
      </filter>
      <rect width="100%" height="100%" filter="url(#emboss-pub)" />
    </svg>
  );
}
