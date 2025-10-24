// Color palette for light and dark themes

const lightColors = {
  // Base colors
  background: "#FFFFFF",
  foreground: "#000000",

  // Card colors
  card: "#F2F2F7",
  cardForeground: "#000000",

  // Popover colors
  popover: "#F2F2F7",
  popoverForeground: "#000000",

  // Primary colors
  primary: "#18181b",
  primaryForeground: "#FFFFFF",

  // Secondary colors
  secondary: "#F2F2F7",
  secondaryForeground: "#18181b",

  // Muted colors
  muted: "#78788033",
  mutedForeground: "#71717a",

  // Accent colors
  accent: "#F2F2F7",
  accentForeground: "#18181b",

  // Destructive colors
  destructive: "#ef4444",
  destructiveForeground: "#FFFFFF",

  // Border and input
  border: "#C6C6C8",
  input: "#e4e4e7",
  ring: "#a1a1aa",

  // Text colors
  text: "#000000",
  textMuted: "#71717a",

  // Legacy support for existing components
  tint: "#18181b",
  icon: "#71717a",
  tabIconDefault: "#71717a",
  tabIconSelected: "#18181b",

  // Default buttons, links, Send button, selected tabs
  blue: "#007AFF",

  // Success states, FaceTime buttons, completed tasks
  green: "#34C759",

  // Delete buttons, error states, critical alerts
  red: "#FF3B30",

  // VoiceOver highlights, warning states
  orange: "#FF9500",

  // Notes app accent, Reminders highlights
  yellow: "#FFCC00",

  // Pink accent color for various UI elements
  pink: "#FF2D92",

  // Purple accent for creative apps and features
  purple: "#AF52DE",

  // Teal accent for communication features
  teal: "#5AC8FA",

  // Indigo accent for system features
  indigo: "#5856D6",

  codeBackground: "#18181b",
  codeText: "#F2F2F7",

  // Extended palette
  info: "#2563eb",
  infoForeground: "#FFFFFF",
  warning: "#facc15",
  warningForeground: "#18181b",
  disabled: "#d1d5db",
  disabledForeground: "#a1a1aa",
  overlay: "rgba(0,0,0,0.15)",
  shadow: "#000000",
  progress: "#007AFF",
  selection: "#e0e7ff",
  selectionForeground: "#18181b",
  divider: "#e5e7eb",
};

const darkColors = {
  // Base colors
  background: "#000000",
  foreground: "#FFFFFF",

  // Card colors
  card: "#1C1C1E",
  cardForeground: "#FFFFFF",

  // Popover colors
  popover: "#18181b",
  popoverForeground: "#FFFFFF",

  // Primary colors
  primary: "#e4e4e7",
  primaryForeground: "#18181b",

  // Secondary colors
  secondary: "#1C1C1E",
  secondaryForeground: "#FFFFFF",

  // Muted colors
  muted: "#78788033",
  mutedForeground: "#c7c7cc",

  // Accent colors
  accent: "#1C1C1E",
  accentForeground: "#FFFFFF",

  // Destructive colors
  destructive: "#dc2626",
  destructiveForeground: "#FFFFFF",

  // Border and input
  border: "#38383A",
  input: "#1C1C1E",
  ring: "#71717a",

  // Text colors
  text: "#FFFFFF",
  textMuted: "#c7c7cc",

  // Legacy support for existing components
  tint: "#FFFFFF",
  icon: "#a1a1aa",
  tabIconDefault: "#a1a1aa",
  tabIconSelected: "#FFFFFF",

  // Default buttons, links, Send button, selected tabs
  blue: "#0A84FF",

  // Success states, FaceTime buttons, completed tasks
  green: "#30D158",

  // Delete buttons, error states, critical alerts
  red: "#FF453A",

  // VoiceOver highlights, warning states
  orange: "#FF9F0A",

  // Notes app accent, Reminders highlights
  yellow: "#FFD60A",

  // Pink accent color for various UI elements
  pink: "#FF375F",

  // Purple accent for creative apps and features
  purple: "#BF5AF2",

  // Teal accent for communication features
  teal: "#64D2FF",

  // Indigo accent for system features
  indigo: "#5E5CE6",

  codeBackground: "#18181b",
  codeText: "#F2F2F7",

  // Extended palette
  info: "#3b82f6",
  infoForeground: "#FFFFFF",
  warning: "#fde047",
  warningForeground: "#18181b",
  disabled: "#374151",
  disabledForeground: "#a1a1aa",
  overlay: "rgba(0,0,0,0.6)",
  shadow: "#000000",
  progress: "#0A84FF",
  selection: "#334155",
  selectionForeground: "#FFFFFF",
  divider: "#262626",
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};

export { darkColors, lightColors };

// Utility type for color keys
export type ColorKeys = keyof typeof lightColors;
