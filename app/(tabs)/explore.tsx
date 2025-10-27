import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { useRouter } from 'expo-router'
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
} from 'lucide-react-native'
import {
  Card,
  Paragraph,
  ScrollView,
  Separator,
  Text,
  XStack,
  YStack,
  useTheme,
} from 'tamagui'

interface ComponentItem {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ size?: number; color?: string }>
  category: string
}

interface FeatureItem {
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; color?: string }>
}

const COMPONENTS: ComponentItem[] = [
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
    description: 'Lucide icons with theme-aware colors',
    icon: Sparkles,
    category: 'Visual',
  },
  {
    id: 'link',
    name: 'Link',
    description: 'Navigation helpers with deep-link awareness',
    icon: LinkIcon,
    category: 'Navigation',
  },
  {
    id: 'spinner',
    name: 'Spinner',
    description: 'Loading indicators with smooth motion primitives',
    icon: Loader,
    category: 'Feedback',
  },
  {
    id: 'mode-toggle',
    name: 'Mode Toggle',
    description: 'Theme switcher built on the Tamagui token system',
    icon: Moon,
    category: 'Interactive',
  },
]

const FEATURES: FeatureItem[] = [
  {
    title: 'Live Preview',
    description: 'See components in action with responsive previews.',
    icon: Eye,
  },
  {
    title: 'Code Examples',
    description: 'Copy and adapt ready-to-ship code snippets.',
    icon: Code,
  },
  {
    title: 'Customizable',
    description: 'Extend with your brand tokens in minutes.',
    icon: Palette,
  },
  {
    title: 'Accessible',
    description: 'Ship inclusive experiences powered by Tamagui.',
    icon: Settings,
  },
]

export default function ExploreScreen() {
  const router = useRouter()
  const theme = useTheme()

  const accent = theme.blue10?.val ?? theme.color11?.val ?? '#2563eb'

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
      <YStack paddingHorizontal="$5" paddingTop="$8" gap="$6">
        <Header
          title="Component Library"
          actions={<ModeToggle />}
        />

        <YStack gap="$4">
          {COMPONENTS.map(item => {
            const Icon = item.icon
            return (
              <Card
                key={item.id}
                bordered
                elevate
                hoverTheme
                pressTheme
                onPress={() => router.push(`https://ui.ahmedbna.com/docs/components/${item.id}`)}
                padding="$4"
                gap="$3"
              >
                <XStack alignItems="center" gap="$4">
                  <YStack
                    backgroundColor="$color2"
                    borderRadius="$3"
                    padding="$3"
                  >
                    <Icon size={22} color={accent} />
                  </YStack>
                  <YStack flex={1} gap="$1">
                    <Text fontWeight="600">{item.name}</Text>
                    <Paragraph size="$3" color="$color11">
                      {item.category}
                    </Paragraph>
                  </YStack>
                  <Button
                    size="$3"
                    variant="outlined"
                    icon={<ArrowRight size={16} />}
                    accessibilityLabel={`Open ${item.name} documentation`}
                  />
                </XStack>
                <Paragraph size="$3" color="$color11">
                  {item.description}
                </Paragraph>
              </Card>
            )
          })}
        </YStack>

        <Separator />

        <YStack gap="$3">
          <Text fontSize="$6" fontWeight="600">
            What you get
          </Text>
          <YStack gap="$3">
            {FEATURES.map(feature => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} bordered padding="$4" gap="$3">
                  <XStack alignItems="center" gap="$3">
                    <Icon size={18} color={accent} />
                    <Text fontWeight="600">{feature.title}</Text>
                  </XStack>
                  <Paragraph size="$3" color="$color11">
                    {feature.description}
                  </Paragraph>
                </Card>
              )
            })}
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
