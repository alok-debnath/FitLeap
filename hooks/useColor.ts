import { useTheme } from 'tamagui'

/**
 * useColor hook - now uses Tamagui's theming system
 * @param colorName - key from Tamagui theme colors
 * @param props - optional overrides for light/dark
 * @returns color value string
 */
export function useColor(
  colorName: string,
  props?: { light?: string; dark?: string }
) {
  const theme = useTheme()

  // If props override is provided, use it
  if (props?.light || props?.dark) {
    // For now, just return the light version since Tamagui handles theme switching
    return props.light || props.dark || theme[colorName as keyof typeof theme] || colorName
  }

  // Return the color from Tamagui theme
  return theme[colorName as keyof typeof theme] || colorName
}