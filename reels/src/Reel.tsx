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
const BG = '#070510';
const FONT = '-apple-system, "Helvetica Neue", Arial, sans-serif';

const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <div style={{ width: 60, height: 47, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, border: `4px solid ${BLUE}`, borderRadius: 10 }} />
      <div style={{ position: 'absolute', top: 14, left: 0, right: 0, height: 3, background: BLUE }} />
      <div style={{ position: 'absolute', top: 6, left: 8, width: 6, height: 6, borderRadius: '50%', background: '#ff7a59' }} />
      <div style={{ position: 'absolute', top: 6, left: 20, width: 6, height: 6, borderRadius: '50%', background: TEAL }} />
      <div style={{ position: 'absolute', top: 6, left: 32, width: 6, height: 6, borderRadius: '50%', background: BLUE }} />
    </div>
    <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.02em', color: '#fff' }}>
      Lajf<span style={{ color: BLUE }}>.eu</span>
    </div>
  </div>
);

export const Reel: React.FC<ReelProps> = (p) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const gd = (frame * 0.4) % 60;
  const g1x = Math.sin(frame * 0.02) * 40;
  const g1y = Math.cos(frame * 0.017) * 30;
  const g2x = Math.cos(frame * 0.015) * 50;
  const g2y = Math.sin(frame * 0.02) * 40;
  const progress = interpolate(frame, [0, durationInFrames], [0, 100]);

  const brand = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 20 });
  const eb = spring({ frame: frame - 14, fps, config: { damping: 200 }, durationInFrames: 18 });

  // sweep + flash FX
  const sweepX = interpolate(frame, [6, 46], [-700, 1800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sweepOpacity = interpolate(frame, [6, 22, 46], [0, 0.22, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT, overflow: 'hidden' }}>
      {p.audio ? (
        <Audio
          src={staticFile(p.audio)}
          startFrom={p.audioStartFrom ?? 0}
          volume={(f) =>
            interpolate(f, [0, 14, durationInFrames - 30, durationInFrames - 1], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      ) : null}

      {/* bg */}
      <AbsoluteFill style={{ background: 'linear-gradient(160deg,#0b1226 0%,#070510 58%,#0a0714 100%)' }} />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${BLUE}14 1px,transparent 1px),linear-gradient(90deg,${BLUE}14 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: `translate(${-gd}px,${-gd}px)`,
          WebkitMaskImage: 'radial-gradient(120% 90% at 70% 20%,#000 30%,transparent 78%)',
        }}
      />
      <div style={{ position: 'absolute', top: -160 + g1y, right: -160 + g1x, width: 760, height: 760, borderRadius: '50%', background: `radial-gradient(circle,rgba(41,105,241,.5)0%,rgba(41,105,241,0)64%)` }} />
      <div style={{ position: 'absolute', bottom: -160 + g2y, left: -180 + g2x, width: 640, height: 640, borderRadius: '50%', background: `radial-gradient(circle,rgba(60,224,180,.2)0%,rgba(60,224,180,0)66%)` }} />
      <AbsoluteFill style={{ boxShadow: 'inset 0 0 300px 70px rgba(0,0,0,.5)' }} />

      {/* sweep */}
      <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: -200, bottom: -200, left: sweepX, width: 260, background: 'linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(160,190,255,.45) 50%,rgba(255,255,255,0) 100%)', transform: 'rotate(14deg)', opacity: sweepOpacity, filter: 'blur(6px)', mixBlendMode: 'screen' }} />
      </AbsoluteFill>

      {/* progress */}
      <div style={{ position: 'absolute', top: 0, left: 0, height: 6, width: `${progress}%`, background: BLUE2 }} />

      {/* logo */}
      <div style={{ position: 'absolute', top: 70, left: 70, transform: `translateX(${interpolate(brand, [0, 1], [-60, 0])}px)`, opacity: brand }}>
        <Logo />
      </div>

      {p.variant === 'realizacja' ? <Realizacja p={p} eb={eb} /> : <Message p={p} eb={eb} />}
    </AbsoluteFill>
  );
};

const Message: React.FC<{ p: ReelProps; eb: number }> = ({ p, eb }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const words = p.words ?? [];
  const wordStart = 22;
  const wordStep = 6;
  const ulStart = wordStart + words.length * wordStep + 4;
  const ul = spring({ frame: frame - ulStart, fps, config: { damping: 200 }, durationInFrames: 22 });
  const subStart = ulStart + 10;
  const sub1 = spring({ frame: frame - subStart, fps, config: { damping: 200 }, durationInFrames: 20 });
  const ctaStart = durationInFrames - 78;
  const ctaS = spring({ frame: frame - ctaStart, fps, config: { damping: 16 }, durationInFrames: 26 });
  const ctaPulse = 1 + 0.03 * Math.sin(frame * 0.3);

  return (
    <>
      <div style={{ position: 'absolute', left: 70, right: 70, top: p.steps ? 300 : 440 }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 26, letterSpacing: '.2em', textTransform: 'uppercase', color: TEAL, opacity: eb, transform: `translateY(${interpolate(eb, [0, 1], [20, 0])}px)`, marginBottom: 26 }}>{p.eyebrow}</div>
        <div style={{ fontSize: p.steps ? 66 : 96, fontWeight: 800, lineHeight: 1.03, letterSpacing: '-.025em', color: '#fff', display: 'flex', flexWrap: 'wrap', columnGap: 24, marginBottom: p.steps ? 34 : 0 }}>
          {words.map((w, i) => {
            const s = spring({ frame: frame - (wordStart + i * wordStep), fps, config: { damping: 18, mass: 0.7 }, durationInFrames: 24 });
            return (
              <span key={i} style={{ display: 'inline-block', opacity: s, transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`, filter: `blur(${interpolate(s, [0, 1], [12, 0])}px)`, color: w.hl ? BLUE : '#fff' }}>{w.t}</span>
            );
          })}
        </div>
        {p.steps ? (
          p.steps.map((st, i) => {
            const s = spring({ frame: frame - (wordStart + 20 + i * 8), fps, config: { damping: 200 }, durationInFrames: 18 });
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '20px 0', borderTop: '2px solid rgba(255,255,255,.12)', opacity: s, transform: `translateX(${interpolate(s, [0, 1], [40, 0])}px)` }}>
                <div style={{ fontSize: 38, fontWeight: 800, color: BLUE, width: 56, flex: 'none' }}>{st.n}</div>
                <div style={{ fontSize: 42, fontWeight: 700, color: '#fff' }}>{st.t}</div>
                {st.s ? <div style={{ fontSize: 26, color: '#93a0bd', marginLeft: 'auto', fontWeight: 500 }}>{st.s}</div> : null}
              </div>
            );
          })
        ) : (
          <>
            <div style={{ height: 8, width: interpolate(ul, [0, 1], [0, 190]), background: BLUE2, borderRadius: 6, marginTop: 28 }} />
            <div style={{ fontSize: 34, color: '#c3ccdf', marginTop: 28, fontWeight: 500, lineHeight: 1.4, opacity: sub1, transform: `translateY(${interpolate(sub1, [0, 1], [20, 0])}px)` }}>{p.sub}</div>
          </>
        )}
      </div>
      {p.cta ? (
        <div style={{ position: 'absolute', left: 70, bottom: 300, transform: `translateY(${interpolate(ctaS, [0, 1], [90, 0])}px)`, opacity: ctaS }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: BLUE2, color: '#fff', fontSize: 34, fontWeight: 800, padding: '24px 46px', borderRadius: 100, transform: `scale(${ctaPulse})` }}>{p.cta} →</div>
        </div>
      ) : null}
    </>
  );
};

const Realizacja: React.FC<{ p: ReelProps; eb: number }> = ({ p, eb }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fr = spring({ frame: frame - 12, fps, config: { damping: 18, mass: 0.8 }, durationInFrames: 28 });
  const frScale = interpolate(fr, [0, 1], [0.9, 1]);
  // scroll the screenshot: 1440x3600 shown at width 900 -> h=2250, visible 1060 -> range 1190
  const scrollY = interpolate(frame, [34, durationInFrames - 50], [0, -1190], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lab = spring({ frame: frame - 24, fps, config: { damping: 200 }, durationInFrames: 20 });

  return (
    <>
      <div style={{ position: 'absolute', top: 150, left: 72, fontFamily: 'ui-monospace, monospace', fontSize: 26, letterSpacing: '.2em', textTransform: 'uppercase', color: TEAL, opacity: eb }}>{p.eyebrow}</div>
      <div style={{ position: 'absolute', top: 330, left: 90, right: 90, borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(255,255,255,.14)', boxShadow: '0 50px 100px rgba(0,0,0,.6)', opacity: fr, transform: `scale(${frScale})`, transformOrigin: 'center top' }}>
        <div style={{ height: 60, background: '#141a2e', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff5f57', marginRight: 10 }} />
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#febc2e', marginRight: 10 }} />
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: 18, background: '#0b0f1c', color: '#8aa0c8', fontSize: 24, padding: '9px 24px', borderRadius: 8, fontFamily: 'ui-monospace, monospace' }}>{p.url}</span>
        </div>
        <div style={{ height: 1060, overflow: 'hidden', position: 'relative' }}>
          <Img src={staticFile(p.shot as string)} style={{ width: '100%', display: 'block', transform: `translateY(${scrollY}px)` }} />
        </div>
      </div>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 1480, opacity: lab, transform: `translateY(${interpolate(lab, [0, 1], [24, 0])}px)` }}>
        <div style={{ fontSize: 66, fontWeight: 800, letterSpacing: '-.02em', color: '#fff' }}>{p.name}</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
          {(p.tags ?? []).map((t, i) => (
            <span key={i} style={{ background: 'rgba(91,140,255,.16)', color: '#9dc0ff', border: '1px solid rgba(91,140,255,.32)', fontSize: 26, fontWeight: 600, padding: '10px 22px', borderRadius: 100 }}>{t}</span>
          ))}
        </div>
      </div>
    </>
  );
};
