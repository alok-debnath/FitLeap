import { createAnimations } from '@tamagui/animations-react-native'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands/v4'
import { defaultThemes, tokens } from '@tamagui/themes/v4'
import { createTamagui, type CreateTamaguiProps } from 'tamagui'

const headingFont = createInterFont({
  family: 'Inter',
  size: {
    1: 12,
    2: 13,
    3: 14,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 28,
    9: 32,
    10: 36,
    11: 44,
    12: 54,
    13: 60,
    14: 72,
    15: 84,
    16: 96,
  },
  weight: {
    1: '300',
    2: '400',
    3: '500',
    4: '600',
    5: '700',
    6: '800',
    7: '900',
  },
})

const bodyFont = createInterFont({
  family: 'Inter',
  size: {
    1: 12,
    2: 13,
    3: 14,
    4: 16,
    5: 18,
    6: 20,
    7: 22,
    8: 24,
    9: 28,
    10: 32,
    11: 36,
    12: 40,
    13: 44,
    14: 52,
    15: 56,
    16: 64,
  },
  weight: {
    1: '300',
    2: '400',
    3: '500',
    4: '600',
    5: '700',
  },
})

const animations = createAnimations({
    bouncy: {
      type: 'spring',
      damping: 18,
      mass: 1.1,
      stiffness: 220,
    },
    lazy: {
      type: 'timing',
      duration: 220,
    },
    quick: {
      type: 'timing',
      duration: 120,
    },
  })

const config = {
  animations: animations as any,
  themes: defaultThemes,
  tokens,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 },
    gtSm: { minWidth: 800 },
    gtMd: { minWidth: 1020 },
    gtLg: { minWidth: 1280 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
} satisfies CreateTamaguiProps

export const tamaguiConfig = createTamagui(config)

export type Conf = typeof tamaguiConfig

export default tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {
    readonly _brand?: never
  }
}