
import { useAuth } from '@convex-dev/auth/react';
import { Button, Input, Text, View } from 'tamagui';
import { useState } from 'react';

export function Auth() {
  const { signIn } = useAuth();
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
      <Button onPress={() => signIn({ email, password })}>Sign in</Button>
    </View>
  );
}
