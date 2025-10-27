import { useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { makeRedirectUri } from 'expo-auth-session'
import { openAuthSessionAsync } from 'expo-web-browser'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { XStack, Text, Button, Spinner } from 'tamagui'

const redirectTo = makeRedirectUri()

export const SignInWithApple = () => {
  const { signIn } = useAuthActions()
  const [loading, setLoading] = useState(false)

  const handleAppleSignIn = async () => {
    setLoading(true)

    const { redirect } = await signIn('apple', {
      redirectTo,
    })

    if (Platform.OS === 'web') {
      return
    }

    const result = await openAuthSessionAsync(redirect!.toString(), redirectTo)

    if (result.type === 'success') {
      const { url } = result

      const code = new URL(url).searchParams.get('code')!

      await signIn('apple', { code })
    } else {
      setLoading(false)
    }
  }

  return (
    <Button
      disabled={loading}
      onPress={handleAppleSignIn}
      size="$5"
    >
      <XStack alignItems="center" space="$3">
        {loading && <Spinner size="small" />}
        <Ionicons name='logo-apple' size={22} />
        <Text>Login with Apple</Text>
      </XStack>
    </Button>
  )
}
