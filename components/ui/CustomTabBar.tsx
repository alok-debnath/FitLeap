"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  type LayoutChangeEvent,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter, usePathname } from "expo-router";
import { useColorScheme } from "react-native";
import { Home, Compass, User } from "lucide-react-native";
import { useTheme, Text } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

// Types
interface TabItem {
  readonly name: string;
  readonly label: string;
  readonly icon: React.ComponentType<{
    size: number;
    color: string;
    strokeWidth?: number;
  }>;
  readonly route: string;
}

interface TabLayout {
  readonly x: number;
  readonly width: number;
}

const TAB_BAR_HEIGHT = 64;
const TAB_BAR_RADIUS = TAB_BAR_HEIGHT; // 32
const CONTAINER_PADDING = 20; // Reduced from 32 to 20 for better proportions
const TAB_BAR_PADDING = 4;
const INDICATOR_HEIGHT = TAB_BAR_HEIGHT - TAB_BAR_PADDING * 2;
const INDICATOR_RADIUS = INDICATOR_HEIGHT / 2;
const INDICATOR_MARGIN = 8;
const CONTAINER_VERTICAL_PADDING = 12; // Consistent top and bottom padding

// Animation constants for better performance
const SPRING_CONFIG = {
  tension: 120,
  friction: 9,
  useNativeDriver: true,
} as const;

const SCALE_CONFIG = {
  tension: 150,
  friction: 8,
  useNativeDriver: true,
} as const;

const tabs: readonly TabItem[] = [
  { name: "index", label: "Home", icon: Home, route: "/(tabs)" },
  {
    name: "explore",
    label: "Explore",
    icon: Compass,
    route: "/(tabs)/explore",
  },
  { name: "profile", label: "Profile", icon: User, route: "/(tabs)/profile" },
] as const;

// Optimized memoized icon component
const TabIcon = React.memo<{
  Icon: React.ComponentType<{
    size: number;
    color: string;
    strokeWidth?: number;
  }>;
  isActive: boolean;
  primaryColor: string;
  secondaryColor: string;
}>(
  ({ Icon, isActive, primaryColor, secondaryColor }) => (
    <Icon
      size={18}
      color={isActive ? primaryColor : secondaryColor}
      strokeWidth={isActive ? 2.5 : 2}
    />
  ),
  (prev, next) => prev.isActive === next.isActive
);

TabIcon.displayName = "TabIcon";

// Memoized tab content component
const TabContent = React.memo<{
  tab: TabItem;
  isActive: boolean;
  colors: {
    primary: string;
    textSecondary: string;
  };
}>(({ tab, isActive, colors }) => (
  <View style={styles.tabContent}>
    <TabIcon
      Icon={tab.icon}
      isActive={isActive}
      primaryColor={colors.primary}
      secondaryColor={colors.textSecondary}
    />
    <Text
      style={[
        styles.label,
        {
          color: isActive ? colors.primary : colors.textSecondary,
          fontWeight: isActive ? "600" : "500",
        },
      ]}
    >
      {tab.label}
    </Text>
  </View>
));

TabContent.displayName = "TabContent";

export function CustomTabBar(): React.ReactElement {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  // Optimized animations with stable references
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(tabs.map(() => new Animated.Value(1))).current;

  // Minimal state with efficient updates
  const [tabLayouts, setTabLayouts] = useState<readonly TabLayout[]>([]);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  const isDark = colorScheme === "dark";

  // Memoized colors with stable reference
  const colors = useMemo(
    () => ({
      primary: "#007AFF",
      textSecondary: isDark ? "#8E8E93" : "#6D6D70",
      border: isDark ? "rgba(84, 84, 88, 0.65)" : "rgba(60, 60, 67, 0.18)",
      shadow: isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.1)",
      indicatorBg: isDark
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(0, 122, 255, 0.12)",
      surface: isDark ? "rgba(28, 28, 30, 0.95)" : "rgba(255, 255, 255, 0.95)",
    }),
    [isDark]
  );

  // Efficient active index calculation with caching
  const activeIndex = useMemo((): number => {
    if (pathname === "/" || pathname === "/(tabs)") return 0;
    if (pathname.includes("/explore")) return 1;
    if (pathname.includes("/profile")) return 2;
    return 0;
  }, [pathname]);

  // Optimized indicator metrics with early returns
  const indicatorMetrics = useMemo(() => {
    if (!isLayoutReady || tabLayouts.length !== tabs.length) {
      return { x: 0, width: 0 };
    }

    const activeTabLayout = tabLayouts[activeIndex];
    if (!activeTabLayout) {
      return { x: 0, width: 0 };
    }

    return {
      x: activeTabLayout.x + INDICATOR_MARGIN,
      width: activeTabLayout.width - INDICATOR_MARGIN * 2,
    };
  }, [isLayoutReady, tabLayouts, activeIndex]);

  // Debounced layout handler for performance
  const handleTabLayout = useCallback(
    (index: number) => {
      return (event: LayoutChangeEvent) => {
        const { x, width } = event.nativeEvent.layout;

        setTabLayouts((prevLayouts) => {
          const newLayouts = [...prevLayouts];
          newLayouts[index] = { x, width };

          // Check if all tabs are measured
          if (
            newLayouts.filter(Boolean).length === tabs.length &&
            !isLayoutReady
          ) {
            setIsLayoutReady(true);
          }

          return newLayouts;
        });
      };
    },
    [isLayoutReady]
  );

  // Optimized animation with cleanup
  useEffect(() => {
    if (!isLayoutReady || indicatorMetrics.width === 0) return;

    const animationRef = Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: indicatorMetrics.x,
        ...SPRING_CONFIG,
      }),
      ...scaleAnims.map((anim, index) =>
        Animated.spring(anim, {
          toValue: index === activeIndex ? 1.03 : 1,
          ...SCALE_CONFIG,
        })
      ),
    ]);

    animationRef.start();

    // Cleanup function
    return () => {
      animationRef.stop();
    };
  }, [activeIndex, slideAnim, scaleAnims, indicatorMetrics, isLayoutReady]);

  // Memoized haptic feedback
  const triggerHaptics = useCallback(async () => {
    try {
      if (Platform.OS === "ios") {
        await Haptics.selectionAsync();
      } else {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch {
      // Haptics not available, fail silently
    }
  }, []);

  // Optimized tab press with debouncing
  const handleTabPress = useCallback(
    async (route: string, index: number) => {
      if (index === activeIndex) return;

      triggerHaptics();

      // Immediate visual feedback
      const scaleAnim = scaleAnims[index];
      if (scaleAnim) {
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 0.97,
            duration: 60,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1.03,
            ...SCALE_CONFIG,
          }),
        ]).start();
      }

      router.push(route as any);
    },
    [activeIndex, router, triggerHaptics, scaleAnims]
  );

  // Memoized background components
  const blurBackground = useMemo(() => {
    if (Platform.OS === "ios") {
      return (
        <BlurView
          intensity={100}
          tint={isDark ? "dark" : "light"}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: colors.surface },
        ]}
      />
    );
  }, [isDark, colors.surface]);

  // RESTORED: Background gradient for content fade
  const backgroundGradient = useMemo(
    () => (
      <LinearGradient
        colors={
          isDark
            ? [
                "transparent",
                "rgba(0, 0, 0, 0.2)",
                "rgba(0, 0, 0, 0.8)",
                "rgba(0, 0, 0, 1)",
              ]
            : [
                "transparent",
                "rgba(255, 255, 255, 0.1)",
                "rgba(255, 255, 255, 0.7)",
                "rgba(255, 255, 255, 1)",
              ]
        }
        style={[
          styles.backgroundGradient,
          {
            paddingBottom: Math.max(insets.bottom, 16) + TAB_BAR_HEIGHT + 16,
          },
        ]}
        pointerEvents="none"
      />
    ),
    [isDark, insets.bottom]
  );

  // Memoized tab items for better performance
  const tabItems = useMemo(
    () =>
      tabs.map((tab, index) => {
        const isActive = index === activeIndex;

        return (
          <Animated.View
            key={tab.name}
            style={[
              styles.tabItem,
              { transform: [{ scale: scaleAnims[index] }] },
            ]}
            onLayout={handleTabLayout(index)}
          >
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => handleTabPress(tab.route, index)}
              activeOpacity={0.7}
              accessibilityLabel={tab.label}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <TabContent tab={tab} isActive={isActive} colors={colors} />
            </TouchableOpacity>
          </Animated.View>
        );
      }),
    [activeIndex, scaleAnims, handleTabLayout, handleTabPress, colors]
  );

  return (
    <>
      {/* RESTORED: Background gradient for content fade */}
      {backgroundGradient}

      <View
        style={[
          styles.container,
          {
            paddingBottom: Math.max(insets.bottom, CONTAINER_VERTICAL_PADDING),
          },
        ]}
      >
        <View
          style={[
            styles.tabBar,
            {
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
          ]}
        >
          {blurBackground}

          {/* Animated indicator */}
          {isLayoutReady && indicatorMetrics.width > 0 && (
            <Animated.View
              style={[
                styles.indicator,
                {
                  backgroundColor: colors.indicatorBg,
                  transform: [{ translateX: slideAnim }],
                  width: indicatorMetrics.width,
                },
              ]}
            />
          )}

          {/* Tab container with perfect centering */}
          <View style={styles.tabsContainer}>{tabItems}</View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // RESTORED: Background gradient for content fade
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
    zIndex: 0,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: CONTAINER_PADDING, // Reduced to 20 for better proportions
    paddingTop: CONTAINER_VERTICAL_PADDING, // Consistent 12px top padding
    zIndex: 1,
  },
  tabBar: {
    height: TAB_BAR_HEIGHT,
    borderRadius: TAB_BAR_RADIUS, // Perfect pill shape (32px radius)
    paddingHorizontal: TAB_BAR_PADDING,
    paddingVertical: TAB_BAR_PADDING,
    borderWidth: Platform.OS === "ios" ? 0.5 : 1,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      },
    }),
    overflow: "hidden",
    position: "relative",
    justifyContent: "center", // Vertically center the pill content
  },
  tabsContainer: {
    flexDirection: "row",
    flex: 1,
    zIndex: 2,
    alignItems: "center", // Ensure vertical centering of tabs
  },
  indicator: {
    position: "absolute",
    height: INDICATOR_HEIGHT,
    borderRadius: INDICATOR_RADIUS,
    top: TAB_BAR_PADDING, // Perfectly centered vertically in pill
    left: TAB_BAR_PADDING,
    zIndex: 1,
  },
  tabItem: {
    flex: 1,
    height: INDICATOR_HEIGHT, // Match indicator height for perfect alignment
    justifyContent: "center", // Center content vertically within tab
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2, // Consistent spacing between icon and text
  },
  label: {
    fontSize: 9,
    letterSpacing: 0.3,
    textAlign: "center",
    lineHeight: 11,
  },
});
