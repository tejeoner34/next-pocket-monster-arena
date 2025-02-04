import type { Config } from 'tailwindcss';

export default {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        backgroundSecondary: 'var(--background-secondary)',
        infoBoxBackground: 'var(--info-box-background)',
        infoBoxBorder: 'var(--info-box-border)',
        infoBoxCriticalDamageText: 'var(--info-box-critical-damage-text)',
        infoBoxMovesBorder: 'var(--info-box-moves-border)',
        pokemonInfoText: 'var(--pokemon-info-text)',
        foreground: 'var(--foreground)',
        buttonPrimary: 'var(--button-primary)',
        buttonSecondary: 'var(--button-secondary)',
        buttonTertiary: 'var(--button-tertiary)',
        buttonQuaternary: 'var(--button-quaternary)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        textTertiary: 'var(--text-tertiary)',
      },
    },
  },
  plugins: [],
} satisfies Config;
