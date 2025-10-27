import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useTabBarPadding = () => {
  const insets = useSafeAreaInsets();

  // Calculate bottom padding to account for CustomTabBar
  const TAB_BAR_HEIGHT = 64;
  const bottomPadding = TAB_BAR_HEIGHT + Math.max(insets.bottom, 16) + 16;

  return bottomPadding;
};
