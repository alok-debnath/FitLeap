
import { useAuth } from '@convex-dev/auth/react';
import { Button } from './Button';

export function SignOutButton() {
  const { signOut } = useAuth();
  return <Button onPress={() => signOut()}>Sign out</Button>;
}
