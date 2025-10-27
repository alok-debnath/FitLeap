import React from "react";
import { StatusBar, Platform, useColorScheme } from "react-native";
import { Tabs } from "expo-router";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { YStack, Spinner, useTheme } from "tamagui";
import { Auth } from "@/components/auth/auth";
import { CustomTabBar } from "@/components/ui/CustomTabBar";

export default function TabLayout() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const accentColor = theme.color10?.val ?? "#007AFF";

  // Modern loading component
  const LoadingScreen = () => (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor={isDark ? "#000000" : "#FFFFFF"}
    >
      <YStack alignItems="center" space="$4">
        <Spinner size="large" color={accentColor} />
        <YStack alignItems="center" space="$2">
          {/* You can add your app logo here */}
          {/* <Image source={require('@/assets/logo.png')} style={styles.logo} /> */}
        </YStack>
      </YStack>
    </YStack>
  );

  return (
    <>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={Platform.OS === "android"}
      />

      <YStack flex={1}>
        <AuthLoading>
          <LoadingScreen />
        </AuthLoading>

        <Unauthenticated>
          <Auth />
        </Unauthenticated>

        <Authenticated>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: "none" },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
              }}
            />
            <Tabs.Screen
              name="explore"
              options={{
                title: "Explore",
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
              }}
            />
          </Tabs>
          <CustomTabBar />
        </Authenticated>
      </YStack>
    </>
  );
}
