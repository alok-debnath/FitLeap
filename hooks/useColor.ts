import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/theme/colors';

/**
 * useColor hook
 * @param colorName - key from Colors.light and Colors.dark
 * @param props - optional overrides for light/dark
 * @returns color value string
 */
export function useColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  props?: { light?: string; dark?: string }
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props?.[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}