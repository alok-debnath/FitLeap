import { SignOutButton } from '@/components/auth/singout'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import { Link } from '@/components/ui/link'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { BookOpen, Stars, Terminal } from 'lucide-react-native'
import {
  Card,
  H1,
  Paragraph,
  ScrollView,
  Separator,
  Text,
  XStack,
  YStack,
  useTheme,
} from 'tamagui'

export default function HomeScreen() {
  const theme = useTheme()

  const accentColor = theme.blue10?.val ?? theme.color11?.val ?? '#2563eb'
  const surface = theme.color2?.val ?? theme.backgroundFocus?.val ?? '#f4f4f5'

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
      <YStack paddingHorizontal="$5" paddingTop="$8" gap="$8">
        <Header
          title="FitLeap UI"
          actions={<ModeToggle />}
        />

        <Card elevate bordered padded>
          <YStack gap="$5">
            <YStack gap="$3" alignItems="center">
              <H1 size="$11" textAlign="center" fontWeight="800">
                Design faster with Tamagui
              </H1>
              <Paragraph size="$4" maxWidth={360} textAlign="center" color="$color11">
                Compose adaptive layouts, reuse tokens, and deliver a consistent brand experience on every screen.
              </Paragraph>
            </YStack>

            <XStack gap="$3" flexWrap="wrap">
              <Link href="/explore" asChild>
                <Button size="$5" flexGrow={1} minWidth={160} icon={<Stars size={18} />}
                >
                  Explore Components
                </Button>
              </Link>
              <Link href="https://ui.ahmedbna.com" asChild>
                <Button
                  size="$5"
                  flexGrow={1}
                  minWidth={160}
                  variant="outlined"
                  icon={<BookOpen size={18} />}
                >
                  Documentation
                </Button>
              </Link>
            </XStack>

            <YStack gap="$3" padding="$4" backgroundColor={surface} borderRadius="$5">
              <XStack gap="$3" alignItems="center">
                <Terminal size={20} color={accentColor} />
                <Text fontWeight="600">Install a component</Text>
              </XStack>
              <YStack
                padding="$3"
                borderRadius="$4"
                borderWidth="$0.5"
                borderColor="$color5"
                backgroundColor="$color1"
              >
                <Text fontSize="$4" textAlign="center">
                  npx bna-ui add avatar
                </Text>
              </YStack>
              <Paragraph size="$3" color="$color11" textAlign="center">
                Generate ready-to-use building blocks without leaving your terminal.
              </Paragraph>
            </YStack>
          </YStack>
        </Card>

        <Separator />

        <YStack gap="$4">
          <Text fontSize="$6" fontWeight="600">
            Quick actions
          </Text>
          <XStack gap="$3" flexWrap="wrap">
            <Link href="/(tabs)/explore" asChild>
              <Button size="$4" flexBasis="48%" minWidth={160}>
                Browse library
              </Button>
            </Link>
            <Link href="https://github.com/alok-debnath" asChild>
              <Button size="$4" variant="outlined" flexBasis="48%" minWidth={160}>
                View changelog
              </Button>
            </Link>
          </XStack>
        </YStack>

        <SignOutButton />

        <YStack alignItems="center" paddingBottom="$6">
          <Paragraph size="$3" color="$color11" textAlign="center">
            Built with ❤️ using Tamagui themes for a seamless multi-platform experience.
          </Paragraph>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
