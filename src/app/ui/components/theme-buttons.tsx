'use client';
import { Theme, themes, useTheme } from '@/app/context/theme-context';
import React from 'react';

export default function ThemeButtons({
  translations,
}: {
  translations: { [key: string]: string };
}) {
  const { toggleTheme } = useTheme();

  const buttons = [
    {
      id: themes.dark,
      label: translations.dark,
      color: 'buttonTertiary',
    },
    {
      id: themes.light,
      label: translations.light,
      color: 'buttonQuaternary',
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-2 text-textTertiary">{translations.chooseTheme}</h2>
      <div className="flex space-x-4">
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
