
import { createTamagui } from 'tamagui';
import { createFont, createTokens } from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';
import { themes, color, radius, size, space, zIndex } from '@tamagui/themes';

const interFont = createFont({
  family: 'Inter, Helvetica, Arial, sans-serif',
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 30,
    9: 36,
    10: 48,
  },
  lineHeight: {
    1: 17,
    2: 22,
    3: 25,
    4: 25,
    5: 28,
    6: 30,
  },
  weight: {
    4: '300',
    6: '600',
  },
  letterSpacing: {
    4: 0,
    8: -1,
  },
});

const tokens = createTokens({
  color,
  radius,
  size,
  space,
  zIndex,
});

const tamaguiConfig = createTamagui({
  fonts: {
    heading: interFont,
    body: interFont,
  },
  themes,
  tokens,
  shorthands,
});

export type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
