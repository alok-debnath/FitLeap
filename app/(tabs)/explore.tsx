
import { Button, ScrollView, Text, View } from '../../components/tamagui';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import {
  ArrowRight,
  Code,
  Eye,
  Link as LinkIcon,
  Loader,
  Moon,
  Mouse,
  Palette,
  Settings,
  Sparkles,
  Type,
} from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { styled } from 'tamagui';

const Icon = styled(View, {
  name: 'Icon',
  width: 40,
  height: 40,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
});

export default function ExploreScreen() {
  const router = useRouter();
  const bottom = useBottomTabBarHeight();

  const components = [
    {
      id: 'button',
      name: 'Button',
      description: 'Interactive button with variants and animations',
      icon: Mouse,
      category: 'Interactive',
    },
    {
      id: 'text',
      name: 'Text',
      description: 'Typography component with variant support',
      icon: Type,
      category: 'Typography',
    },
    {
      id: 'icon',
      name: 'Icon',
      description: 'Lucide icons with theme support',
      icon: Sparkles,
      category: 'Visual',
    },
    {
      id: 'link',
      name: 'Link',
      description: 'Navigation links with external support',
      icon: LinkIcon,
      category: 'Navigation',
    },
    {
      id: 'spinner',
      name: 'Spinner',
      description: 'Loading indicators with multiple variants',
      icon: Loader,
      category: 'Feedback',
    },
    {
      id: 'mode-toggle',
      name: 'Mode Toggle',
      description: 'Theme switcher with smooth animations',
      icon: Moon,
      category: 'Interactive',
    },
  ];

  const features = [
    {
      title: 'Live Preview',
      description: 'See components in action with real-time demos',
      icon: Eye,
    },
    {
      title: 'Code Examples',
      description: 'Copy-paste ready code snippets',
      icon: Code,
    },
    {
      title: 'Customizable',
      description: 'Easy to customize with your brand colors',
      icon: Palette,
    },
    {
      title: 'Accessible',
      description: 'Built with accessibility in mind',
      icon: Settings,
    },
  ];

  return (
    <ScrollView
      flex={1}
      contentContainerStyle={{ paddingBottom: bottom }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View paddingTop={64} paddingHorizontal={20} paddingBottom={20}>
        <View flexDirection='row' alignItems='center' justifyContent='space-between'>
          <Text fontSize={24} fontWeight='700'>
            Components
          </Text>
        </View>
      </View>

      {/* Components List */}
      <View paddingHorizontal={20} marginBottom={40}>
        <View gap={12}>
          {components.map((component) => (
            <TouchableOpacity
              key={component.id}
              onPress={() =>
                router.push(
                  `https://ui.ahmedbna.com/docs/components/${component.id}`
                )
              }
            >
              <View
                padding={16}
                borderRadius={12}
                borderWidth={1}
                borderColor='$borderColor'
                backgroundColor='$cardColor'
              >
                <View flexDirection='row' alignItems='center' marginBottom={8}>
                  <Icon>
                    <component.icon size={24} color='$primaryColor' />
                  </Icon>
                  <View flex={1}>
                    <Text fontWeight='600' marginBottom={2}>
                      {component.name}
                    </Text>
                    <Text opacity={0.6} fontSize={12}>
                      {component.category}
                    </Text>
                  </View>
                  <Button chromeless icon={ArrowRight} />
                </View>
                <Text opacity={0.7} lineHeight={18}>
                  {component.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Features Overview */}
      <View paddingHorizontal={20} marginBottom={40}>
        <Text textAlign='center' marginBottom={24} fontWeight='700'>
          What You Get
        </Text>
        <View gap={12}>
          {features.map((feature, index) => (
            <View
              key={index}
              flexDirection='row'
              alignItems='center'
              padding={16}
              borderRadius={12}
              borderWidth={1}
              gap={12}
              borderColor='$borderColor'
              backgroundColor='$cardColor'
            >
              <feature.icon size={20} color='$primaryColor' />
              <View flex={1}>
                <Text fontWeight='600' marginBottom={4}>
                  {feature.title}
                </Text>
                <Text opacity={0.7} lineHeight={18}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
