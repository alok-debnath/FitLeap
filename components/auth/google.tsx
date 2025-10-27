import { useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { makeRedirectUri } from 'expo-auth-session'
import { openAuthSessionAsync } from 'expo-web-browser'
import { ActivityIndicator, Platform } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { XStack, Text, Button, useTheme } from 'tamagui'

const redirectTo = makeRedirectUri()

export const SignInWithGoogle = () => {
  const { signIn } = useAuthActions()
  const [loading, setLoading] = useState(false)
  const theme = useTheme()

  const handleGoogleSignIn = async () => {
    setLoading(true)

    const { redirect } = await signIn('google', {
      redirectTo,
    })

    if (Platform.OS === 'web') {
      return
    }

    const result = await openAuthSessionAsync(redirect!.toString(), redirectTo)

    if (result.type === 'success') {
      const { url } = result

      const code = new URL(url).searchParams.get('code')!

      await signIn('google', { code })
    } else {
      setLoading(false)
    }
  }

  return (
    <Button
      disabled={loading}
      onPress={handleGoogleSignIn}
  icon={<Ionicons name="logo-google" size={20} />}
      size="$5"
    >
      <XStack alignItems="center" space="$3">
        {loading && (
          <ActivityIndicator size="small" color={theme.color?.val ?? undefined} />
        )}
        <Text>Login with Google</Text>
      </XStack>
    </Button>
  )
}
