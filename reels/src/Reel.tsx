import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type Word = { t: string; hl?: boolean };
export type Step = { n: string; t: string; s?: string };

export type ReelProps = {
  variant: 'message' | 'realizacja';
  eyebrow: string;
  words?: Word[];
  sub?: string;
  cta?: string;
  steps?: Step[];
  shot?: string;
  url?: string;
  name?: string;
  tags?: string[];
  audio?: string;
  audioStartFrom?: number;
};

const BLUE = '#5b8cff';
const BLUE2 = '#2969f1';
const TEAL = '#3ce0b4';
const VIOLET = '#7b5bff';
const BG = '#05040d';
const FONT = '-apple-system, "Helvetica Neue", Arial, sans-serif';
const GRAD = `linear-gradient(100deg, ${BLUE} 0%, ${TEAL} 100%)`;

const gradText = { background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } as React.CSSProperties;

const Blob: React.FC<{ c: string; s: number; x: number; y: number; f: number; seed: number }> = ({ c, s, x, y, f, seed }) => {
  const dx = Math.sin(f * 0.012 + seed) * 90;
  const dy = Math.cos(f * 0.01 + seed * 1.7) * 70;
  const sc = 1 + 0.14 * Math.sin(f * 0.014 + seed);
  return (
    <div style={{ position: 'absolute', left: x + dx, top: y + dy, width: s, height: s, borderRadius: '50%', background: `radial-gradient(circle, ${c} 0%, transparent 66%)`, transform: `scale(${sc})`, mixBlendMode: 'screen', filter: 'blur(10px)' }} />
  );
};

const Grain: React.FC<{ f: number }> = ({ f }) => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05, mixBlendMode: 'overlay', pointerEvents: 'none' }}>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={Math.floor(f / 2) % 40} stitchTiles="stitch" /></filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <div style={{ width: 60, height: 47, position: 'relative', filter: 'drop-shadow(0 0 10px rgba(91,140,255,.5))' }}>
      <div style={{ position: 'absolute', inset: 0, border: `4px solid ${BLUE}`, borderRadius: 10 }} />
      <div style={{ position: 'absolute', top: 14, left: 0, right: 0, height: 3, background: BLUE }} />
      <div style={{ position: 'absolute', top: 6, left: 8, width: 6, height: 6, borderRadius: '50%', background: '#ff7a59' }} />
      <div style={{ position: 'absolute', top: 6, left: 20, width: 6, height: 6, borderRadius: '50%', background: TEAL }} />
      <div style={{ position: 'absolute', top: 6, left: 32, width: 6, height: 6, borderRadius: '50%', background: BLUE }} />
    </div>
    <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.02em', color: '#fff' }}>Lajf<span style={{ color: BLUE }}>.eu</span></div>
  </div>
);

export const Reel: React.FC<ReelProps> = (p) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 100]);
  const brand = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 20 });
  const eb = spring({ frame: frame - 14, fps, config: { damping: 200 }, durationInFrames: 18 });
  const sceneScale = 1 + interpolate(frame, [0, durationInFrames], [0, 0.03]);
  const gd = (frame * 0.35) % 64;

  const sweepX = interpolate(frame, [8, 52], [-800, 1900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sweepOp = interpolate(frame, [8, 26, 52], [0, 0.18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT, overflow: 'hidden' }}>
      {p.audio ? (
        <Audio src={staticFile(p.audio)} startFrom={p.audioStartFrom ?? 0} volume={(f) => interpolate(f, [0, 14, durationInFrames - 30, durationInFrames - 1], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
      ) : null}

      {/* aurora mesh */}
      <AbsoluteFill style={{ background: 'radial-gradient(130% 100% at 30% 8%, #0e1430 0%, #070610 55%, #05040d 100%)' }} />
      <AbsoluteFill style={{ transform: `scale(${sceneScale})` }}>
        <Blob c="rgba(41,105,241,.55)" s={880} x={430} y={-160} f={frame} seed={0} />
        <Blob c="rgba(60,224,180,.34)" s={720} x={-220} y={980} f={frame} seed={2.1} />
        <Blob c="rgba(123,91,255,.4)" s={760} x={640} y={560} f={frame} seed={4.2} />
        <Blob c="rgba(91,140,255,.34)" s={640} x={40} y={240} f={frame} seed={1.2} />
      </AbsoluteFill>
      {/* grid */}
      <AbsoluteFill style={{ backgroundImage: `linear-gradient(${BLUE}10 1px,transparent 1px),linear-gradient(90deg,${BLUE}10 1px,transparent 1px)`, backgroundSize: '64px 64px', transform: `translate(${-gd}px,${-gd}px)`, WebkitMaskImage: 'radial-gradient(120% 90% at 60% 30%,#000 20%,transparent 72%)' }} />
      <Grain f={frame} />
      <AbsoluteFill style={{ boxShadow: 'inset 0 0 340px 80px rgba(0,0,0,.6)' }} />

      {/* sweep */}
      <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: -200, bottom: -200, left: sweepX, width: 300, background: 'linear-gradient(90deg,transparent,rgba(160,190,255,.4),transparent)', transform: 'rotate(14deg)', opacity: sweepOp, filter: 'blur(8px)', mixBlendMode: 'screen' }} />
      </AbsoluteFill>

      <div style={{ position: 'absolute', top: 0, left: 0, height: 6, width: `${progress}%`, background: GRAD }} />
      <div style={{ position: 'absolute', top: 70, left: 70, transform: `translateX(${interpolate(brand, [0, 1], [-60, 0])}px)`, opacity: brand }}><Logo /></div>

      {p.variant === 'realizacja' ? <Realizacja p={p} eb={eb} /> : <Message p={p} eb={eb} />}
    </AbsoluteFill>
  );
};

const Eyebrow: React.FC<{ t: string; o: number; top: number }> = ({ t, o, top }) => (
  <div style={{ position: 'absolute', left: 72, top, display: 'flex', alignItems: 'center', gap: 16, opacity: o }}>
    <div style={{ width: interpolate(o, [0, 1], [0, 40]), height: 4, background: TEAL, borderRadius: 3, boxShadow: `0 0 10px ${TEAL}` }} />
    <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 25, letterSpacing: '.24em', textTransform: 'uppercase', color: TEAL }}>{t}</div>
  </div>
);

const Message: React.FC<{ p: ReelProps; eb: number }> = ({ p, eb }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const words = p.words ?? [];
  const wordStart = 24;
  const wordStep = 7;
  const ulStart = wordStart + words.length * wordStep + 6;
  const ul = spring({ frame: frame - ulStart, fps, config: { damping: 200 }, durationInFrames: 24 });
  const subStart = ulStart + 10;
  const sub1 = spring({ frame: frame - subStart, fps, config: { damping: 200 }, durationInFrames: 20 });
  const ctaStart = durationInFrames - 80;
  const ctaS = spring({ frame: frame - ctaStart, fps, config: { damping: 16 }, durationInFrames: 26 });
  const ctaGlow = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.08));

  return (
    <>
      <Eyebrow t={p.eyebrow} o={eb} top={p.steps ? 300 : 470} />
      <div style={{ position: 'absolute', left: 70, right: 70, top: p.steps ? 360 : 530 }}>
        <div style={{ fontSize: p.steps ? 66 : 100, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-.03em', display: 'flex', flexWrap: 'wrap', columnGap: 24, marginBottom: p.steps ? 36 : 0 }}>
          {words.map((w, i) => {
            const s = spring({ frame: frame - (wordStart + i * wordStep), fps, config: { damping: 16, mass: 0.7 }, durationInFrames: 26 });
            const style: React.CSSProperties = { display: 'inline-block', opacity: s, transform: `translateY(${interpolate(s, [0, 1], [70, 0])}px) scale(${interpolate(s, [0, 1], [0.92, 1])})`, transformOrigin: 'left bottom', filter: `blur(${interpolate(s, [0, 1], [14, 0])}px)` };
            return <span key={i} style={w.hl ? { ...style, ...gradText } : { ...style, color: '#fff' }}>{w.t}</span>;
          })}
        </div>
        {p.steps ? (
          p.steps.map((st, i) => {
            const s = spring({ frame: frame - (wordStart + 22 + i * 8), fps, config: { damping: 200 }, durationInFrames: 18 });
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '20px 0', borderTop: '1px solid rgba(255,255,255,.14)', opacity: s, transform: `translateX(${interpolate(s, [0, 1], [40, 0])}px)` }}>
                <div style={{ fontSize: 38, fontWeight: 800, width: 56, flex: 'none', ...gradText }}>{st.n}</div>
                <div style={{ fontSize: 42, fontWeight: 700, color: '#fff' }}>{st.t}</div>
                {st.s ? <div style={{ fontSize: 26, color: '#93a0bd', marginLeft: 'auto', fontWeight: 500 }}>{st.s}</div> : null}
              </div>
            );
          })
        ) : (
          <>
            <div style={{ height: 8, width: interpolate(ul, [0, 1], [0, 200]), background: GRAD, borderRadius: 6, marginTop: 30, boxShadow: `0 0 24px rgba(60,224,180,.5)` }} />
            <div style={{ fontSize: 34, color: '#cfd6e6', marginTop: 30, fontWeight: 500, lineHeight: 1.42, opacity: sub1, transform: `translateY(${interpolate(sub1, [0, 1], [20, 0])}px)` }}>{p.sub}</div>
          </>
        )}
      </div>
      {p.cta ? (
        <div style={{ position: 'absolute', left: 70, bottom: 300, transform: `translateY(${interpolate(ctaS, [0, 1], [90, 0])}px)`, opacity: ctaS }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: GRAD, color: '#05040d', fontSize: 34, fontWeight: 800, padding: '24px 46px', borderRadius: 100, boxShadow: `0 0 ${40 + 40 * ctaGlow}px rgba(60,224,180,${0.35 + 0.35 * ctaGlow})` }}>{p.cta} →</div>
        </div>
      ) : null}
    </>
  );
};

const Realizacja: React.FC<{ p: ReelProps; eb: number }> = ({ p, eb }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fr = spring({ frame: frame - 12, fps, config: { damping: 16, mass: 0.9 }, durationInFrames: 30 });
  const rotY = interpolate(fr, [0, 1], [14, -5]);
  const floatY = Math.sin(frame * 0.045) * 12;
  const scrollY = interpolate(frame, [36, durationInFrames - 54], [0, -1190], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lab = spring({ frame: frame - 26, fps, config: { damping: 200 }, durationInFrames: 20 });
  const sheenX = interpolate((frame + 40) % 150, [0, 90], [-300, 1100], { extrapolateRight: 'clamp' });

  return (
    <>
      <Eyebrow t={p.eyebrow} o={eb} top={158} />
      <div style={{ position: 'absolute', top: 340, left: 90, right: 90, perspective: 1800 }}>
        <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(140,170,255,.22)', boxShadow: '0 60px 120px rgba(0,0,0,.7), 0 0 80px rgba(41,105,241,.25)', opacity: fr, transform: `rotateY(${rotY}deg) rotateX(3deg) translateY(${floatY}px) scale(${interpolate(fr, [0, 1], [0.9, 1])})`, transformStyle: 'preserve-3d', position: 'relative' }}>
          <div style={{ height: 62, background: 'linear-gradient(180deg,#1a2340,#141a2e)', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
            <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff5f57', marginRight: 10 }} />
            <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#febc2e', marginRight: 10 }} />
            <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: 18, background: '#0a0e1c', color: '#9db0d6', fontSize: 24, padding: '9px 26px', borderRadius: 9, fontFamily: 'ui-monospace, monospace', border: '1px solid rgba(140,170,255,.14)' }}>{p.url}</span>
          </div>
          <div style={{ height: 1040, overflow: 'hidden', position: 'relative' }}>
            <Img src={staticFile(p.shot as string)} style={{ width: '100%', display: 'block', transform: `translateY(${scrollY}px)` }} />
            {/* glass sheen */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: sheenX, width: 200, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.10),transparent)', transform: 'skewX(-16deg)', pointerEvents: 'none' }} />
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 1500, opacity: lab, transform: `translateY(${interpolate(lab, [0, 1], [26, 0])}px)` }}>
        <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: '-.02em', color: '#fff' }}>{p.name}</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          {(p.tags ?? []).map((t, i) => (
            <span key={i} style={{ background: 'rgba(91,140,255,.14)', color: '#a9c4ff', border: '1px solid rgba(91,140,255,.3)', fontSize: 26, fontWeight: 600, padding: '10px 22px', borderRadius: 100, backdropFilter: 'blur(4px)' }}>{t}</span>
          ))}
        </div>
      </div>
    </>
  );
};
