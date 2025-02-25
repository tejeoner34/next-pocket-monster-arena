import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
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
        stunned: 'stunned 0.5s 0.3s forwards',
        spinner: 'spinner 2s infinite linear',
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
        stunned: {
          '0%': { opacity: '0' },
          '25%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        spinner: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(50deg)' },
          '50%': { transform: 'rotate(-50deg)' },
          '75%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
