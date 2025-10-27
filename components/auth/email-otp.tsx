import React, { useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { KeyRound, MailCheck } from 'lucide-react-native'
import { YStack, Text, Card, Button, Input, Paragraph, Spinner } from 'tamagui'

type AuthStep = 'signIn' | 'verifyEmail'

export const EmailOTP = () => {
  const { signIn } = useAuthActions()

  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState<AuthStep>('signIn')

  // Form inputs
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  // Loading and error states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const resetFormState = () => {
    setEmail('')
    setCode('')
    setError('')
    setLoading(false)
  }

  const changeStep = (newStep: AuthStep) => {
    resetFormState()
    setStep(newStep)
  }

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setError('Please enter a valid email address.')
      return false
    }
    setError('')
    return true
  }

  const handleSendCode = async () => {
    if (!validateEmail(email)) return

    setLoading(true)
    setError('')

    try {
      await signIn('resend-otp', { email, flow: step })

      setStep('verifyEmail')
    } catch (err: any) {
      console.error(`${step} error:`, err)
      setError('Authentication failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyEmail = async () => {
    if (code.length < 6) {
      setError('Please enter the 6-digit code.')
      return
    }
    setLoading(true)
    setError('')

    try {
      await signIn('resend-otp', {
        email,
        code,
        flow: 'email-verification',
      })
    } catch (err: any) {
      console.error('Email verification error:', err)
      setError('Invalid verification code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'verifyEmail') {
    return (
      <Card elevate size="$4">
        <Card.Header padded>
          <YStack alignItems="center" space="$3">
            <MailCheck size={40} color="$green10" />
            <Text fontSize="$6" fontWeight="bold" textAlign="center">
              Check your email
            </Text>
            <Paragraph textAlign="center">
              {`We've sent a 6-digit code to ${email}`}
            </Paragraph>
          </YStack>
        </Card.Header>
        <Card.Footer padded>
          <YStack space="$4" width="100%">
            <Input
              size="$4"
              placeholder="Enter 6-digit code"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              textAlign="center"
              fontSize="$6"
              fontWeight="bold"
            />
            {error && <Text color="$red10" textAlign="center">{error}</Text>}
            <Button
              onPress={handleVerifyEmail}
              disabled={loading || code.length < 6}
              size="$5"
            >
              {loading ? <Spinner /> : 'Verify Code'}
            </Button>
            <Button
              variant="outlined"
              onPress={() => changeStep('signIn')}
              disabled={loading}
            >
              Use a different email
            </Button>
          </YStack>
        </Card.Footer>
      </Card>
    )
  }

  return (
    <Card elevate size="$4">
      <Card.Header padded>
        <YStack alignItems="center" space="$3">
          <KeyRound size={40} color="$green10" />
          <Text fontSize="$6" fontWeight="bold" textAlign="center">
            OTP Email Login
          </Text>
          <Paragraph textAlign="center">
            Enter your email to receive OTP code.
          </Paragraph>
        </YStack>
      </Card.Header>
      <Card.Footer padded>
        <YStack space="$4" width="100%">
          <Input
            size="$4"
            placeholder="me@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            disabled={loading}
          />
          {error && <Text color="$red10" textAlign="center">{error}</Text>}
          <Button
            onPress={handleSendCode}
            disabled={loading}
            size="$5"
          >
            {loading ? <Spinner /> : 'Send Code'}
          </Button>
        </YStack>
      </Card.Footer>
    </Card>
  )
}
