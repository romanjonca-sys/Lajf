import React from 'react';
import { Composition } from 'remotion';
import { Reel, ReelProps } from './Reel';

const TECH = 'audio/tech-1.mp3';
type Def = { id: string } & ReelProps;

const REELS: Def[] = [
  {
    id: '01-hero',
    variant: 'message',
    eyebrow: 'Agencja stron dla firm',
    words: [{ t: 'Strony,' }, { t: 'które' }, { t: 'pracują', hl: true }, { t: 'na' }, { t: 'klientów.' }],
    sub: 'Szybkie · bezpieczne · pod konwersję. Projekt, wdrożenie i opieka w jednym miejscu.',
    cta: 'lajf.eu',
    audio: TECH,
    audioStartFrom: 300,
  },
  {
    id: '02-real-stanio',
    variant: 'realizacja',
    eyebrow: 'Realizacja',
    shot: 'shots/stanio-tall.png',
    url: 'krzysztofstanio.pl',
    name: 'Krzysztof Stanio',
    tags: ['Strona', 'Rezerwacje', 'RODO'],
    audio: TECH,
    audioStartFrom: 600,
  },
  {
    id: '03-bol',
    variant: 'message',
    eyebrow: 'Bez owijania',
    words: [{ t: 'Twoja' }, { t: 'strona' }, { t: 'jak' }, { t: 'z' }, { t: '2010?', hl: true }],
    sub: 'Wolna, nieczytelna na telefonie, nie sprzedaje. Czas na taką, która pracuje na klientów.',
    cta: 'lajf.eu',
    audio: TECH,
    audioStartFrom: 900,
  },
  {
    id: '04-real-mojerodo',
    variant: 'realizacja',
    eyebrow: 'Realizacja',
    shot: 'shots/mojerodo-tall.png',
    url: 'moje-rodo.pl',
    name: 'Moje RODO',
    tags: ['Aplikacja', 'Płatności', 'Bezpieczeństwo'],
    audio: TECH,
    audioStartFrom: 1200,
  },
  {
    id: '05-proces',
    variant: 'message',
    eyebrow: 'Jak pracujemy',
    words: [{ t: 'Od' }, { t: 'rozmowy' }, { t: 'do' }, { t: 'strony.', hl: true }],
    steps: [
      { n: '01', t: 'Rozmowa i cel', s: 'bezpłatnie' },
      { n: '02', t: 'Projekt i treść', s: 'akceptujesz' },
      { n: '03', t: 'Wdrożenie', s: 'szybko' },
      { n: '04', t: 'Opieka', s: 'na bieżąco' },
    ],
    audio: TECH,
    audioStartFrom: 1500,
  },
  {
    id: '06-real-dzwiekdobry',
    variant: 'realizacja',
    eyebrow: 'Realizacja',
    shot: 'shots/dzwiekdobry-tall.png',
    url: 'dzwiekdobry.pl',
    name: 'Dźwięk Dobry',
    tags: ['Strona', 'SEO', 'Formularze'],
    audio: TECH,
    audioStartFrom: 1800,
  },
  {
    id: '07-rodo',
    variant: 'message',
    eyebrow: 'W standardzie',
    words: [{ t: 'Bezpieczeństwo' }, { t: 'i' }, { t: 'RODO', hl: true }, { t: 'wbudowane.' }],
    sub: 'Zgodność od pierwszego dnia — nie doklejona na końcu. Śpisz spokojnie, także przy kontroli.',
    cta: 'lajf.eu',
    audio: TECH,
    audioStartFrom: 2100,
  },
  {
    id: '08-cta',
    variant: 'message',
    eyebrow: 'Zacznijmy',
    words: [{ t: 'Bezpłatna' }, { t: 'konsultacja.', hl: true }],
    sub: '15 minut. Powiem wprost, co poprawić na Twojej stronie — nawet jeśli nie zrobimy jej razem.',
    cta: 'Napisz · lajf.eu',
    audio: TECH,
    audioStartFrom: 450,
  },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {REELS.map(({ id, ...props }) => (
        <Composition key={id} id={id} component={Reel} durationInFrames={420} fps={30} width={1080} height={1920} defaultProps={props} />
      ))}
    </>
  );
};
