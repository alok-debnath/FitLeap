
import {
  Button,
  ScrollView,
  Text,
  View,
  Link,
  SignOutButton,
} from '@/components/tamagui';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BookOpen, Stars, Terminal } from 'lucide-react-native';

export default function HomeScreen() {
  const bottom = useBottomTabBarHeight();

  return (
    <ScrollView
      flex={1}
      contentContainerStyle={{ paddingBottom: bottom, paddingHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View paddingTop={64}>
        <View flexDirection='row' alignItems='center' justifyContent='space-between'>
          <Text fontSize={36} fontWeight='800' textAlign='center' marginBottom={16}>
            BNA UI
          </Text>
        </View>
      </View>

      {/* Hero Section */}
      <View paddingVertical={30} alignItems='center'>
        <Text fontSize={36} fontWeight='800' textAlign='center' marginBottom={16}>
          Welcome to BNA UI
        </Text>
        <Text textAlign='center' marginBottom={16} opacity={0.8}>
          A beautiful, modern component library for Expo, React Native apps
        </Text>
        <Text textAlign='center' lineHeight={24}>
          Build stunning mobile applications with our carefully crafted
          components.
        </Text>
      </View>

      {/* Action Buttons */}
      <View gap={12} marginBottom={40}>
        <Link asChild href='/explore'>
          <Button size='$4' icon={Stars}>
            Explore Components
          </Button>
        </Link>
        <Link asChild href='https://ui.ahmedbna.com'>
          <Button theme='green' size='$4' icon={BookOpen}>
            Documentation
          </Button>
        </Link>
      </View>

      {/* Getting Started */}
      <View marginBottom={20}>
        <View
          padding={24}
          borderRadius={16}
          borderWidth={1}
          alignItems='center'
          borderColor='$borderColor'
          backgroundColor='$cardColor'
        >
          <View flexDirection='row' alignItems='center' gap={8} marginBottom={16}>
            <Terminal size={20} color='$primaryColor' />
            <Text fontWeight='600'>Add Components</Text>
          </View>
          <View
            paddingHorizontal={16}
            paddingVertical={12}
            borderRadius={8}
            marginBottom={16}
            minWidth='100%'
            backgroundColor='$codeBackgroundColor'
          >
            <Text fontFamily='$mono' fontSize={16} textAlign='center'>
              npx bna-ui add avatar
            </Text>
          </View>
          <Text textAlign='center' opacity={0.7}>
            Add components to your project with a single command
          </Text>
        </View>
      </View>

      <SignOutButton />

      {/* Footer */}
      <View paddingVertical={40} alignItems='center'>
        <Text textAlign='center' fontSize={14}>
          Built with ❤️ for Expo, React Native developers by BNA
        </Text>
      </View>
    </ScrollView>
  );
}
