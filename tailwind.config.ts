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
