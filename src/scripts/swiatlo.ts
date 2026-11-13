/**
 * Tło „nieostrego światła” pod pierwszym ekranem (wzór: antimetal.com, który robi to shaderem WebGL).
 * Kilka bardzo miękkich plam w kolorach Lajf powoli dryfuje po jasnym tle. Canvas wstawiamy
 * do .hero (strona główna) albo .phero (podstrony). Bez WebGL zostaje samo tło strony.
 * Animacja stoi, gdy pierwszy ekran jest poza widokiem; przy ograniczonych animacjach rysujemy jedną klatkę.
 */

const SKALA_RENDERU = 0.5; // plamy są rozmyte, więc pół rozdzielczości wystarczy i oszczędza baterię
const MAX_DPR = 1.5;
const TEMPO = 0.6;

const VERTEX = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAGMENT = `#version 300 es
precision mediump float;
uniform vec2 r;
uniform float t;
uniform float sila;
out vec4 kolor;

float plama(vec2 p, vec2 c, float s) { vec2 d = p - c; return exp(-dot(d, d) / (s * s)); }
float szum(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 uv = gl_FragCoord.xy / r;
  vec2 p = vec2(uv.x * r.x / r.y, 1.0 - uv.y);
  float a = r.x / r.y;
  // lekkie falowanie przestrzeni, żeby plamy nie były idealnymi kołami
  p += 0.06 * vec2(sin(p.y * 2.7 + t * 0.21), cos(p.x * 2.3 + t * 0.17));

  vec3 tlo = vec3(0.933, 0.929, 0.953);
  vec3 c = tlo;
  // góra zostaje prawie czysta, światło zbiera się niżej, za oknem przeglądarki (jak na antimetal.com)
  c = mix(c, vec3(0.165, 0.145, 0.251), sila * 0.34 * plama(p, vec2(a * (0.07 + 0.04 * sin(t * 0.11)), 0.86 + 0.05 * cos(t * 0.13)), 0.36));
  c = mix(c, vec3(0.357, 0.549, 1.000), sila * 0.42 * plama(p, vec2(a * (0.93 + 0.04 * cos(t * 0.09)), 0.78 + 0.06 * sin(t * 0.12)), 0.34));
  c = mix(c, vec3(0.659, 0.635, 0.741), sila * 0.30 * plama(p, vec2(a * (0.62 + 0.08 * sin(t * 0.07)), 0.64 + 0.05 * cos(t * 0.10)), 0.30));
  c = mix(c, vec3(0.420, 0.470, 0.900), sila * 0.22 * plama(p, vec2(a * (0.32 + 0.10 * cos(t * 0.05)), 1.05), 0.30));
  c += (szum(gl_FragCoord.xy + t) - 0.5) / 160.0; // ziarno przeciw pasmom
  kolor = vec4(c, 1.0);
}`;

function shader(gl: WebGL2RenderingContext, typ: number, zrodlo: string): WebGLShader | null {
  const s = gl.createShader(typ);
  if (!s) return null;
  gl.shaderSource(s, zrodlo);
  gl.compileShader(s);
  if (gl.getShaderParameter(s, gl.COMPILE_STATUS)) return s;
  console.warn('[swiatlo] shader:', gl.getShaderInfoLog(s));
  return null;
}

function program(gl: WebGL2RenderingContext): WebGLProgram | null {
  const v = shader(gl, gl.VERTEX_SHADER, VERTEX);
  const f = shader(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const prog = gl.createProgram();
  if (!v || !f || !prog) return null;
  gl.attachShader(prog, v);
  gl.attachShader(prog, f);
  gl.linkProgram(prog);
  return gl.getProgramParameter(prog, gl.LINK_STATUS) ? prog : null;
}

function wlacz(kontener: HTMLElement, sila: number): void {
  if (kontener.dataset.swiatlo) return;
  kontener.dataset.swiatlo = '1';
  const canvas = document.createElement('canvas');
  canvas.className = 'swiatlo';
  canvas.setAttribute('aria-hidden', 'true');
  kontener.prepend(canvas);
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
  const prog = gl ? program(gl) : null;
  if (!gl || !prog) { canvas.remove(); return; }

  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const atrybut = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(atrybut);
  gl.vertexAttribPointer(atrybut, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(prog, 'r');
  const uT = gl.getUniformLocation(prog, 't');
  gl.uniform1f(gl.getUniformLocation(prog, 'sila'), sila);

  const rozmiar = (): void => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR) * SKALA_RENDERU;
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uR, canvas.width, canvas.height);
  };
  const rysuj = (t: number): void => { gl.uniform1f(uT, t); gl.drawArrays(gl.TRIANGLES, 0, 3); };
  new ResizeObserver(() => { rozmiar(); rysuj(performance.now() / 1000 * TEMPO); }).observe(canvas);
  rozmiar();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { rysuj(4); return; }
  let widoczny = true;
  let klatka = 0;
  const petla = (ms: number): void => {
    if (!widoczny) return; // sprawdzamy flagę przed kolejną klatką
    rysuj(ms / 1000 * TEMPO);
    klatka = requestAnimationFrame(petla);
  };
  new IntersectionObserver(([wpis]) => {
    widoczny = wpis.isIntersecting;
    cancelAnimationFrame(klatka);
    if (widoczny) klatka = requestAnimationFrame(petla);
  }).observe(canvas);
}

/** Strona główna: pełna siła za przeglądarką; podstrony: delikatniej za nagłówkiem. */
export function swiatlo(): void {
  const glowna = document.querySelector<HTMLElement>('.hero');
  // gdy pod nagłówkiem stoi zdjęcie (#scena), shader i tak byłby zasłonięty
  if (glowna && !document.getElementById('scena')) wlacz(glowna, 1);
  const podstrona = document.querySelector<HTMLElement>('.phero');
  if (podstrona) wlacz(podstrona, 0.75);
}
