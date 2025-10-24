
import { useAuthActions } from '@convex-dev/auth/react';
import { Button, Input, Text, View } from 'tamagui';
import { useState } from 'react';

export function Auth() {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View flex={1} justifyContent='center' alignItems='center' gap={12}>
      <Text>Sign In</Text>
      <Input
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
      />
      <Input
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={() => signIn({ provider: 'password', email, password })}>
        Sign in
      </Button>
      <Button onPress={() => signIn({ provider: 'google' })}>
        Sign in with Google
      </Button>
      <Button onPress={() => signIn({ provider: 'apple' })}>
        Sign in with Apple
      </Button>
      <Button onPress={() => signIn({ provider: 'password', flow: 'signUp', email, password })}>
        Sign up
      </Button>
    </View>
  );
}
