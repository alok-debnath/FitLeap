
import { useFonts } from 'expo-font';
import { Platform, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ConvexReactClient } from 'convex/react';
import * as SecureStore from 'expo-secure-store';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import 'react-native-reanimated';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });
  const colorScheme = useColorScheme();

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
          <ConvexAuthProvider
            client={convex}
            storage={
              Platform.OS === 'android' || Platform.OS === 'ios'
                ? secureStorage
                : undefined
            }
          >
            <Stack>
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
              <Stack.Screen name='+not-found' />
            </Stack>
          </ConvexAuthProvider>
          <StatusBar style='auto' />
        </Theme>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
