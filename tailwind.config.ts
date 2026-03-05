import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nothing: {
          bg: 'var(--nothing-bg)',
          surface: 'var(--nothing-surface)',
          'surface-light': 'var(--nothing-surface-light)',
          red: 'var(--nothing-red)',
          text: 'var(--nothing-text)',
          muted: 'var(--nothing-muted)',
        },
      },
      fontFamily: {
        nothing: ['var(--font-nothing)'],
        headline: ['var(--font-headline)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
};
export default config;
