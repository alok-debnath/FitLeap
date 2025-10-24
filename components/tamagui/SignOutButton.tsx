
import { useAuthActions } from '@convex-dev/auth/react';
import { Button } from './Button';

export function SignOutButton() {
  const { signOut } = useAuthActions();
  return <Button onPress={() => signOut()}>Sign out</Button>;
}
