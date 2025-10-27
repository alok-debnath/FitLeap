import { YStack, XStack, Text, ScrollView, Card, H1, Paragraph, Button, Separator } from 'tamagui'
import { SignInWithGoogle } from '@/components/auth/google'
import { SignInWithApple } from '@/components/auth/apple'
import { Password } from '@/components/auth/password'
import { EmailOTP } from './email-otp'
import { useState } from 'react'

type AuthTab = 'oauth' | 'password' | 'otp'

export const Auth = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>('oauth')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'oauth':
        return (
          <Card elevate bordered padding="$5" gap="$4">
            <YStack gap="$3">
              <Paragraph textAlign="center">
                Choose a provider to continue with your FitLeap profile.
              </Paragraph>
              <Separator />
              <YStack gap="$3">
                <SignInWithGoogle />
                <SignInWithApple />
              </YStack>
            </YStack>
          </Card>
        )
      case 'password':
        return <Password />
      case 'otp':
        return <EmailOTP />
      default:
        return null
    }
  }

  return (
    <ScrollView
      flex={1}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <YStack
        flex={1}
        paddingHorizontal="$5"
        paddingTop="$10"
        paddingBottom="$6"
        gap="$6"
      >
        <YStack alignItems="center" gap="$2">
          <Text fontSize={56} accessibilityRole="image">
            🚀
          </Text>
          <H1 fontSize="$13" textAlign="center">
            FitLeap
          </H1>
          <Paragraph size="$3" textAlign="center" color="$color11">
            Unlock your next milestone with tailored training plans, smart tracking, and accountability.
          </Paragraph>
        </YStack>

        <YStack width="100%" maxWidth={420} alignSelf="center" gap="$4">
          <XStack gap="$2" backgroundColor="$color2" borderRadius="$5" padding="$1">
            {(
              [
                { key: 'oauth', label: 'Providers' },
                { key: 'password', label: 'Password' },
                { key: 'otp', label: 'Email OTP' },
              ] as const
            ).map(tab => (
              <Button
                key={tab.key}
                flex={1}
                size="$3"
                variant={activeTab === tab.key ? undefined : 'outlined'}
                theme={activeTab === tab.key ? 'accent' : null}
                onPress={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </Button>
            ))}
          </XStack>

          {renderTabContent()}

          <Paragraph size="$3" textAlign="center" color="$color11">
            By continuing you agree to our{' '}
            <Text color="$color10" textDecorationLine="underline">
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text color="$color10" textDecorationLine="underline">
              Privacy Policy
            </Text>
          </Paragraph>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
