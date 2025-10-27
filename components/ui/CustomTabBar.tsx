import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useColorScheme } from "react-native";
import { Home, Stars, UserCircle2 } from "lucide-react-native";
import { useTheme, YStack, Text } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

interface TabItem {
  name: string;
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  route: string;
}

const tabs: TabItem[] = [
  { name: "index", label: "Home", icon: Home, route: "/(tabs)" },
  { name: "explore", label: "Explore", icon: Stars, route: "/(tabs)/explore" },
  {
    name: "profile",
    label: "Profile",
    icon: UserCircle2,
    route: "/(tabs)/profile",
  },
];

export function CustomTabBar() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const activeColor = theme.color11?.val ?? "#2563eb";
  const inactiveColor = theme.color10?.val ?? "#6b7280"; // Medium gray for better visibility
  const surfaceColor = theme.color2?.val ?? "#f8f9fa";
  const isDark = colorScheme === "dark";

  const getCurrentTabIndex = () => {
    if (pathname === "/" || pathname === "/(tabs)") return 0;
    if (pathname.includes("/explore")) return 1;
    if (pathname.includes("/profile")) return 2;
    return 0;
  };

  const activeIndex = getCurrentTabIndex();

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [activeIndex]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <LinearGradient
        colors={
          isDark
            ? ["transparent", "rgba(0,0,0,0.05)", "rgba(0, 0, 0, 1)"]
            : ["transparent", "rgba(255,255,255,0.05)", "rgba(255,255,255, 1)"]
        }
        style={styles.overlay}
        pointerEvents="none"
      />
      <View style={[styles.tabBar, { backgroundColor: surfaceColor }]}>
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const Icon = tab.icon;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabItem}
              onPress={() => router.push(tab.route as any)}
              activeOpacity={0.7}
            >
              <YStack alignItems="center" space="$1">
                <View style={styles.iconContainer}>
                  <Icon
                    size={isActive ? 24 : 22}
                    color={isActive ? activeColor : inactiveColor}
                  />
                </View>
                <Text
                  fontSize="$3"
                  fontWeight={isActive ? "600" : "400"}
                  color={isActive ? activeColor : inactiveColor}
                  textAlign="center"
                >
                  {tab.label}
                </Text>
              </YStack>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120, // Extends above the tab bar for gradual effect
    borderRadius: 0,
  },
  tabBar: {
    flexDirection: "row",
    height: 64,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
