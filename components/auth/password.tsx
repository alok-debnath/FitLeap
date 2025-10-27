import React, { useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { KeyRound, MailCheck } from 'lucide-react-native'
import { YStack, XStack, Text, Card, Button, Input, Paragraph, Spinner } from 'tamagui'

type AuthStep =
  | 'signIn'
  | 'signUp'
  | 'verifyEmail' // For new user email verification
  | 'forgotPassword' // Screen to enter email for password reset
  | 'resetPassword' // Screen to enter reset code and new password

export const Password = () => {
  const { signIn } = useAuthActions()

  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState<AuthStep>('signIn')

  // Form inputs
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // Loading and error states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const resetFormState = () => {
    setEmail('')
    setPassword('')
    setCode('')
    setNewPassword('')
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

  const validatePassword = (value: string) => {
    if (
      value.length < 8 ||
      !/\d/.test(value) ||
      !/[a-z]/.test(value) ||
      !/[A-Z]/.test(value)
    ) {
      setError(
        'Password must be 8+ characters with uppercase, lowercase, and numbers.'
      )
      return false
    }
    setError('')
    return true
  }

  const handleSignInUpSubmit = async () => {
    if (!validateEmail(email) || !validatePassword(password)) return

    setLoading(true)
    setError('')

    try {
      await signIn('password', { name, gender, email, password, flow: step })

      if (step === 'signUp') {
        setStep('verifyEmail')
        setPassword('')
      }
    } catch (err: any) {
      console.error(`${step} error:`, err)
      setError('Authentication failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyEmailSubmit = async () => {
    if (code.length < 6) {
      setError('Please enter the 6-digit code.')
      return
    }
    setLoading(true)
    setError('')

    try {
      await signIn('password', {
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

  const handleSendResetCode = async () => {
    if (!validateEmail(email)) return

    setLoading(true)
    setError('')

    try {
      await signIn('password', { email, flow: 'reset' })
      setStep('resetPassword')
    } catch (err: any) {
      console.error('Send reset code error:', err)
      setError(
        'Failed to send reset code. Please check the email and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (!validatePassword(newPassword)) return
    if (code.length < 6) {
      setError('Please enter the 6-digit reset code.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await signIn('password', {
        email,
        code,
        newPassword,
        flow: 'reset-verification',
      })

      changeStep('signIn')
    } catch (err: any) {
      console.error('Password reset error:', err)
      setError('Failed to reset password. The code may be invalid or expired.')
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
              onPress={handleVerifyEmailSubmit}
              disabled={loading || code.length < 6}
              size="$5"
            >
              {loading ? <Spinner /> : 'Verify'}
            </Button>
            <Button
              variant="outlined"
              onPress={() => changeStep('signUp')}
              disabled={loading}
            >
              Use a different email
            </Button>
          </YStack>
        </Card.Footer>
      </Card>
    )
  }

  if (step === 'forgotPassword') {
    return (
      <Card elevate size="$4">
        <Card.Header padded>
          <YStack alignItems="center" space="$3">
            <KeyRound size={40} color="$green10" />
            <Text fontSize="$6" fontWeight="bold" textAlign="center">
              Reset your password
            </Text>
            <Paragraph textAlign="center">
              Enter your email to receive a password reset code.
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
              onPress={handleSendResetCode}
              disabled={loading}
              size="$5"
            >
              {loading ? <Spinner /> : 'Send Reset Code'}
            </Button>
            <Button
              variant="outlined"
              onPress={() => changeStep('signIn')}
              disabled={loading}
            >
              Back to Login
            </Button>
          </YStack>
        </Card.Footer>
      </Card>
    )
  }

  if (step === 'resetPassword') {
    return (
      <Card elevate size="$4">
        <Card.Header padded>
          <YStack alignItems="center" space="$3">
            <Text fontSize="$6" fontWeight="bold" textAlign="center">
              Create a new password
            </Text>
            <Paragraph textAlign="center">
              A reset code was sent to {email}.
            </Paragraph>
          </YStack>
        </Card.Header>
        <Card.Footer padded>
          <YStack space="$4" width="100%">
            <Input
              size="$4"
              placeholder="6-digit reset code"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
            />
            <Input
              size="$4"
              placeholder="New password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              autoComplete="new-password"
            />
            {error && <Text color="$red10" textAlign="center">{error}</Text>}
            <Button
              onPress={handleResetPassword}
              disabled={loading}
              size="$5"
            >
              {loading ? <Spinner /> : 'Reset Password'}
            </Button>
            <Button
              variant="outlined"
              onPress={() => changeStep('forgotPassword')}
              disabled={loading}
            >
              Use a different email
            </Button>
          </YStack>
        </Card.Footer>
      </Card>
    )
  }

  // Default view for 'signIn' and 'signUp'
  const isSigningIn = step === 'signIn'

  return (
    <Card elevate size="$4">
      <Card.Header padded>
        <Paragraph textAlign="center">
          {isSigningIn
            ? 'Welcome back! Login to continue.'
            : 'Create an account to get started.'}
        </Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <YStack space="$4" width="100%">
          {step === 'signUp' && (
            <XStack space="$2">
              <Input
                flex={1}
                size="$4"
                placeholder="Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                disabled={loading}
              />
              <Input
                flex={1}
                size="$4"
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
                autoCapitalize="words"
                disabled={loading}
              />
            </XStack>
          )}

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
          <Input
            size="$4"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete={isSigningIn ? 'current-password' : 'new-password'}
            disabled={loading}
          />
          {error && <Text color="$red10" textAlign="center">{error}</Text>}
          <Button
            onPress={handleSignInUpSubmit}
            disabled={loading}
            size="$5"
          >
            {loading ? <Spinner /> : (isSigningIn ? 'Login' : 'Create new account')}
          </Button>
          <Button
            variant="outlined"
            onPress={() => changeStep(isSigningIn ? 'signUp' : 'signIn')}
            disabled={loading}
          >
            {isSigningIn
              ? 'Create new account'
              : 'Already have an account, Login'}
          </Button>
          {isSigningIn && (
            <Button
              variant="outlined"
              disabled={loading}
              onPress={() => changeStep('forgotPassword')}
            >
              Forgot password
            </Button>
          )}
        </YStack>
      </Card.Footer>
    </Card>
  )
}
