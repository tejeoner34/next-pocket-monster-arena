'use client';
import { Theme, themes, useTheme } from '@/app/context/theme-context';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function ThemeButtons() {
  const t = useTranslations('home');
  const { toggleTheme } = useTheme();

  const buttons = [
    {
      id: themes.dark,
      label: t('dark'),
      color: 'buttonTertiary',
    },
    {
      id: themes.light,
      label: t('light'),
      color: 'buttonQuaternary',
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-2 text-textTertiary">{t('chooseTheme')}</h2>
      <div className="flex justify-center space-x-4">
        {buttons.map((button) => (
          <button
            key={button.id}
            className={`bg-${button.color}  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={() => toggleTheme(button.id as Theme)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
