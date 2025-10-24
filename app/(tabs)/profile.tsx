
import { ScrollView, Text, View } from '../../components/tamagui';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function ProfileScreen() {
  const bottom = useBottomTabBarHeight();

  return (
    <ScrollView
      flex={1}
      contentContainerStyle={{ padding: 20, paddingBottom: bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View paddingTop={64} paddingBottom={20}>
        <View flexDirection='row' alignItems='center' justifyContent='space-between'>
          <Text fontSize={24} fontWeight='700'>
            Profile
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
