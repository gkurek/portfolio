export interface SandboxColorPair {
  name: string;
  pattern: string;
  background: string;
  material: string;
}

/** Curated background + accent pairs based on common UI palettes and color theory. */
export const sandboxColorPairs: SandboxColorPair[] = [
  {
    name: 'nord',
    pattern: 'analogous cool',
    background: '#2e3440',
    material: '#88c0d0',
  },
  {
    name: 'dracula',
    pattern: 'complementary',
    background: '#282a36',
    material: '#bd93f9',
  },
  {
    name: 'tokyo night',
    pattern: 'triadic',
    background: '#1a1b26',
    material: '#7aa2f7',
  },
  {
    name: 'catppuccin',
    pattern: 'monochromatic',
    background: '#1e1e2e',
    material: '#cba6f7',
  },
  {
    name: 'gruvbox',
    pattern: 'warm accent',
    background: '#282828',
    material: '#fabd2f',
  },
  {
    name: 'one dark',
    pattern: 'split-complementary',
    background: '#282c34',
    material: '#61afef',
  },
  {
    name: 'solarized',
    pattern: 'complementary',
    background: '#002b36',
    material: '#2aa198',
  },
  {
    name: 'ocean',
    pattern: 'analogous',
    background: '#0a1628',
    material: '#4ecdc4',
  },
  {
    name: 'midnight rose',
    pattern: 'complementary',
    background: '#1a0a2e',
    material: '#e94560',
  },
  {
    name: 'forest',
    pattern: 'analogous',
    background: '#1a2419',
    material: '#7cb342',
  },
  {
    name: 'dusk',
    pattern: 'warm analogous',
    background: '#1f1511',
    material: '#f4845f',
  },
  {
    name: 'slate rose',
    pattern: 'split-complementary',
    background: '#1e293b',
    material: '#f472b6',
  },
  {
    name: 'deep gold',
    pattern: 'complementary',
    background: '#0d1b2a',
    material: '#e0a458',
  },
  {
    name: 'charcoal coral',
    pattern: 'triadic',
    background: '#212121',
    material: '#ff6b6b',
  },
  {
    name: 'ink cyan',
    pattern: 'complementary',
    background: '#111827',
    material: '#22d3ee',
  },
  {
    name: 'mocha',
    pattern: 'monochromatic warm',
    background: '#2d2420',
    material: '#d4a574',
  },
  {
    name: 'violet dream',
    pattern: 'analogous',
    background: '#18122b',
    material: '#a78bfa',
  },
  {
    name: 'emerald night',
    pattern: 'complementary',
    background: '#0b1410',
    material: '#34d399',
  },
  {
    name: 'sakura',
    pattern: 'split-complementary',
    background: '#1c1218',
    material: '#f9a8d4',
  },
  {
    name: 'github dark',
    pattern: 'brand accent',
    background: '#0d1117',
    material: '#58a6ff',
  },
  {
    name: 'monokai pro',
    pattern: 'triadic',
    background: '#2d2a2e',
    material: '#ffd866',
  },
  {
    name: 'ayu mirage',
    pattern: 'analogous',
    background: '#1f2430',
    material: '#ffb454',
  },
  {
    name: 'night owl',
    pattern: 'complementary',
    background: '#011627',
    material: '#82aaff',
  },
  {
    name: 'palenight',
    pattern: 'split-complementary',
    background: '#292d3e',
    material: '#c792ea',
  },
  {
    name: 'material dark',
    pattern: 'brand',
    background: '#121212',
    material: '#bb86fc',
  },
  {
    name: 'spotify',
    pattern: 'monochromatic',
    background: '#121212',
    material: '#1db954',
  },
  {
    name: 'notion',
    pattern: 'neutral accent',
    background: '#191919',
    material: '#e16259',
  },
  {
    name: 'vercel',
    pattern: 'high contrast',
    background: '#000000',
    material: '#ffffff',
  },
  {
    name: 'stripe',
    pattern: 'complementary',
    background: '#0a2540',
    material: '#635bff',
  },
  {
    name: 'tailwind slate',
    pattern: 'analogous',
    background: '#0f172a',
    material: '#38bdf8',
  },
  {
    name: 'tailwind zinc',
    pattern: 'split-complementary',
    background: '#18181b',
    material: '#a855f7',
  },
  {
    name: 'copper rust',
    pattern: 'warm complementary',
    background: '#1c1410',
    material: '#c97b63',
  },
  {
    name: 'arctic',
    pattern: 'cool monochromatic',
    background: '#0b1d2a',
    material: '#b8e0f6',
  },
  {
    name: 'lavender haze',
    pattern: 'analogous',
    background: '#1a1625',
    material: '#c4b5fd',
  },
  {
    name: 'neon lime',
    pattern: 'complementary',
    background: '#101410',
    material: '#a3e635',
  },
  {
    name: 'crimson noir',
    pattern: 'split-complementary',
    background: '#140a0c',
    material: '#ef4444',
  },
  {
    name: 'amber dusk',
    pattern: 'warm analogous',
    background: '#1a1408',
    material: '#fbbf24',
  },
  {
    name: 'teal storm',
    pattern: 'triadic',
    background: '#0a1a1a',
    material: '#2dd4bf',
  },
  {
    name: 'indigo ink',
    pattern: 'monochromatic',
    background: '#0f1029',
    material: '#818cf8',
  },
  {
    name: 'rose quartz',
    pattern: 'analogous',
    background: '#1f1418',
    material: '#fb7185',
  },
  {
    name: 'mint frost',
    pattern: 'complementary',
    background: '#0f1a17',
    material: '#6ee7b7',
  },
  {
    name: 'burnt sienna',
    pattern: 'earth tones',
    background: '#1c1512',
    material: '#e07a5f',
  },
  {
    name: 'electric blue',
    pattern: 'high contrast',
    background: '#050816',
    material: '#3b82f6',
  },
  {
    name: 'plum wine',
    pattern: 'analogous',
    background: '#1a0f1a',
    material: '#d946ef',
  },
  {
    name: 'olive grove',
    pattern: 'natural',
    background: '#171a12',
    material: '#a3b18a',
  },
  {
    name: 'sandstone',
    pattern: 'monochromatic warm',
    background: '#1f1a14',
    material: '#e9c46a',
  },
  {
    name: 'glacier',
    pattern: 'cool complementary',
    background: '#0c1821',
    material: '#90e0ef',
  },
  {
    name: 'magma',
    pattern: 'complementary',
    background: '#1a0e0a',
    material: '#ff7b00',
  },
  {
    name: 'jade temple',
    pattern: 'triadic',
    background: '#0f1a14',
    material: '#10b981',
  },
];

export const defaultColorPair = sandboxColorPairs[0];

export function pickRandomColorPair(
  current?: Pick<SandboxColorPair, 'background' | 'material'>,
) {
  const pool =
    current && sandboxColorPairs.length > 1
      ? sandboxColorPairs.filter(
          (pair) =>
            pair.background !== current.background ||
            pair.material !== current.material,
        )
      : sandboxColorPairs;

  return pool[Math.floor(Math.random() * pool.length)];
}
