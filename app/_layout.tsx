// import '../tamagui-web.css'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { useColorScheme, StatusBar } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { SetNavigationBarColor } from '@/components/ui/SetNavigationBarColor'
import { ConvexReactClient } from 'convex/react'
import { ConvexAuthProvider } from '@convex-dev/auth/react'

import { tamaguiConfig } from '../tamagui.config'
import { createSecureStorage } from '../hooks/useSecureStorage'

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
})

const secureStorage = createSecureStorage()

function StatusBarSetter() {
  const colorScheme = useColorScheme()

  return (
    <StatusBar
      backgroundColor="transparent"
      barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      translucent
    />
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <StatusBarSetter />
      <SetNavigationBarColor />
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ConvexAuthProvider client={convex} storage={secureStorage}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ConvexAuthProvider>
      </ThemeProvider>
    </TamaguiProvider>
  )
}