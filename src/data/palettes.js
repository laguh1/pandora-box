// Color palettes for theme customization
// Each palette contains colors for: background, primary, accent1, accent2, accent3

export const palettes = [
  {
    id: 'current',
    name: 'Ocean Blue (Current)',
    colors: {
      background: '#213448',  // Dark blue background
      primary: '#213448',     // Header/primary elements
      accent1: '#547792',     // Medium blue
      accent2: '#94B4C1',     // Light blue
      accent3: '#EAE0CF',     // Cream/Beige
      text: '#FFFFFF',        // White text
      textLight: '#94B4C1'    // Light blue secondary text
    },
    // Chrome tab group colors mapping
    chromeColors: {
      accent1: 'blue',
      accent2: 'cyan',
      accent3: 'grey'
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colors: {
      background: '#3B4953',  // Dark grey-blue
      primary: '#3B4953',
      accent1: '#5A7863',     // Dark green
      accent2: '#90AB8B',     // Medium green
      accent3: '#EBF4DD',     // Light cream-green
      text: '#FFFFFF',
      textLight: '#90AB8B'
    },
    chromeColors: {
      accent1: 'green',
      accent2: 'green',
      accent3: 'grey'
    }
  },
  {
    id: 'rose',
    name: 'Rose Garden',
    colors: {
      background: '#574964',  // Dark purple-brown
      primary: '#574964',
      accent1: '#9F8383',     // Rose brown
      accent2: '#C8AAAA',     // Light rose
      accent3: '#FFDAB3',     // Peach
      text: '#FFFFFF',
      textLight: '#C8AAAA'
    },
    chromeColors: {
      accent1: 'red',
      accent2: 'pink',
      accent3: 'orange'
    }
  },
  {
    id: 'vibrant',
    name: 'Vibrant Pink',
    colors: {
      background: '#640D5F',  // Dark magenta
      primary: '#640D5F',
      accent1: '#D91656',     // Bright pink
      accent2: '#EE66A6',     // Light pink
      accent3: '#FFEB55',     // Bright yellow
      text: '#FFFFFF',
      textLight: '#EE66A6'
    },
    chromeColors: {
      accent1: 'red',
      accent2: 'pink',
      accent3: 'yellow'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Grey',
    colors: {
      background: '#393E46',  // Dark grey
      primary: '#393E46',
      accent1: '#929AAB',     // Medium grey-blue
      accent2: '#EEEEEE',     // Light grey
      accent3: '#F7F7F7',     // Off-white
      text: '#FFFFFF',
      textLight: '#929AAB'
    },
    chromeColors: {
      accent1: 'grey',
      accent2: 'grey',
      accent3: 'grey'
    }
  }
];

/**
 * Get palette by ID
 */
export function getPalette(id) {
  return palettes.find(p => p.id === id) || palettes[0];
}

/**
 * Apply palette to CSS variables
 */
export function applyPalette(palette) {
  const root = document.documentElement;

  root.style.setProperty('--color-background', palette.colors.background);
  root.style.setProperty('--color-primary', palette.colors.primary);
  root.style.setProperty('--color-primary-dark', adjustBrightness(palette.colors.primary, -10));
  root.style.setProperty('--color-primary-light', adjustBrightness(palette.colors.primary, 10));
  root.style.setProperty('--color-text', palette.colors.text);
  root.style.setProperty('--color-text-light', palette.colors.textLight);

  // Store palette accents for topic color assignment
  root.style.setProperty('--accent-1', palette.colors.accent1);
  root.style.setProperty('--accent-2', palette.colors.accent2);
  root.style.setProperty('--accent-3', palette.colors.accent3);
}

/**
 * Adjust brightness of a hex color
 */
function adjustBrightness(hex, percent) {
  // Remove the # if present
  hex = hex.replace('#', '');

  // Convert to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Adjust brightness
  r = Math.max(0, Math.min(255, r + Math.round(255 * percent / 100)));
  g = Math.max(0, Math.min(255, g + Math.round(255 * percent / 100)));
  b = Math.max(0, Math.min(255, b + Math.round(255 * percent / 100)));

  // Convert back to hex
  const rr = r.toString(16).padStart(2, '0');
  const gg = g.toString(16).padStart(2, '0');
  const bb = b.toString(16).padStart(2, '0');

  return `#${rr}${gg}${bb}`;
}

/**
 * Assign colors to topics based on palette
 * Rotates through accent colors for variety
 */
export function assignTopicColors(topics, palette) {
  const accentColors = [
    { color: palette.colors.accent1, chromeColor: palette.chromeColors.accent1 },
    { color: palette.colors.accent2, chromeColor: palette.chromeColors.accent2 },
    { color: palette.colors.accent3, chromeColor: palette.chromeColors.accent3 }
  ];

  return topics.map((topic, index) => ({
    ...topic,
    color: accentColors[index % 3].color,
    chromeColor: accentColors[index % 3].chromeColor
  }));
}

export default palettes;
