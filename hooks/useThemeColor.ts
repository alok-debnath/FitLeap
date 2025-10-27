/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme } from 'tamagui'

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
) {
  const theme = useTheme()

  // If props override is provided, use it
  if (props.light || props.dark) {
    // For now, just return the light version since Tamagui handles theme switching
    return props.light || props.dark || theme[colorName as keyof typeof theme] || colorName
  }

  // Return the color from Tamagui theme
  return theme[colorName as keyof typeof theme] || colorName
}
