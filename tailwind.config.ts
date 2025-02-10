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
      animation: {
        attack: 'attack 0.2s ease-in-out',
        'rival-attack': 'rival-attack 0.2s ease-in-out',
        defeat: 'defeat 1s forwards',
      },
      keyframes: {
        attack: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(100px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'rival-attack': {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(0)' },
        },
        defeat: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
