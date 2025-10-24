
import { Stack } from 'expo-router';
import { Link, Text, View } from '@/components/tamagui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View flex={1} alignItems='center' justifyContent='center' padding={20}>
        <Text>This screen does not exist.</Text>
        <Link href='/'>Go to home screen!</Link>
      </View>
    </>
  );
}
