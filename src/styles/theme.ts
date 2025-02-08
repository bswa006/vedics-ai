export const theme = {
  colors: {
    midnightIndigo: '#2E2A5D',
    vedicSaffron: '#F6A623',
    celestialLilac: '#7F7ACA',
    creamWhite: '#FDFBF7',
    coolGray: '#8A8A8A',
    deepCharcoal: '#1F1F1F',
    greenishTeal: '#3FA796',
    statusRed: '#E83B3B',
  },
  gradients: {
    primary: 'linear-gradient(to right, #2E2A5D, #7F7ACA)',
    accent: 'linear-gradient(to right, #F6A623, #FFB74D)',
    background: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(127,122,202,0.3), rgba(255,255,255,0))',
  },
  typography: {
    heading: {
      fontFamily: 'Poppins, sans-serif',
      weights: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    body: {
      fontFamily: 'Roboto, sans-serif',
      weights: {
        regular: 400,
        medium: 500,
      },
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  animations: {
    transition: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
  },
} as const;

export type Theme = typeof theme;
