import React from 'react'
import { Tabs } from 'expo-router'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { YStack, Spinner, useTheme } from 'tamagui'
import { Auth } from '@/components/auth/auth'
import { CustomTabBar } from '@/components/ui/CustomTabBar'

export default function TabLayout() {
  const theme = useTheme()
  const accentColor = theme.color10?.val ?? '#2563eb'

  return (
    <YStack flex={1}>
      <AuthLoading>
        <YStack flex={1} alignItems="center" justifyContent="center">
          <Spinner size="large" color={accentColor} />
        </YStack>
      </AuthLoading>
      <Unauthenticated>
        <Auth />
      </Unauthenticated>
      <Authenticated>
        <YStack flex={1}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="explore" />
            <Tabs.Screen name="profile" />
          </Tabs>
          <CustomTabBar />
        </YStack>
      </Authenticated>
    </YStack>
  )
}
