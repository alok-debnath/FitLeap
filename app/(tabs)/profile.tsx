import { BottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Skeleton } from '@/components/ui/skeleton'
import { SignOutButton } from '@/components/auth/singout'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { Edit3 } from 'lucide-react-native'
import { useEffect, useMemo, useState } from 'react'
import { Avatar, Card, Paragraph, ScrollView, Separator, Text, XStack, YStack } from 'tamagui'
import { useTabBarPadding } from '@/hooks/useTabBarPadding'

export default function ProfileScreen() {
  const user = useQuery(api.users.get)
  const updateUser = useMutation(api.users.update)
  const bottomPadding = useTabBarPadding()

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && isSheetOpen) {
      setName(user.name ?? '')
      setBio(user.bio ?? '')
    }
  }, [user, isSheetOpen])

  const initials = useMemo(() => {
    if (!user?.name) {
      return 'F'
    }
    return user.name
      .trim()
      .split(/\s+/)
      .map(part => part[0]?.toUpperCase() ?? '')
      .slice(0, 2)
      .join('') || 'F'
  }, [user?.name])

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Please provide your name.')
      return
    }

    setSaving(true)
    setError('')

    try {
      await updateUser({
        name: name.trim(),
        bio: bio.trim() || undefined,
      })
      setIsSheetOpen(false)
    } catch (err) {
      console.error('Profile update failed', err)
      setError('We could not update your profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: bottomPadding }} showsVerticalScrollIndicator={false}>
      <YStack paddingHorizontal="$5" paddingTop="$8" gap="$6">
        <Header title="Your profile" />

        <XStack justifyContent="flex-end" gap="$2" marginBottom="$4">
          <ModeToggle />
          <Button
            size="$3"
            variant="outlined"
            icon={<Edit3 size={16} />}
            disabled={!user}
            onPress={() => setIsSheetOpen(true)}
          >
            Edit
          </Button>
        </XStack>

        {user ? (
          <Card elevate bordered padding="$5" gap="$4">
            <XStack gap="$4" alignItems="center">
              <Avatar circular size="$7" borderWidth={2} borderColor="$color6">
                {user.image && <Avatar.Image source={{ uri: user.image }} />}
                <Avatar.Fallback backgroundColor="$color3">
                  <Text fontWeight="600">{initials}</Text>
                </Avatar.Fallback>
              </Avatar>
              <YStack gap="$1" flex={1}>
                <Text fontSize="$6" fontWeight="600">
                  {user.name ?? 'Anonymous athlete'}
                </Text>
                {user.email && (
                  <Paragraph size="$3" color="$color11">
                    {user.email}
                  </Paragraph>
                )}
              </YStack>
            </XStack>

            <Separator />

            <Paragraph size="$3" color="$color11">
              {user.bio && user.bio.trim().length > 0
                ? user.bio
                : 'Add a short bio so teammates know a bit more about you.'}
            </Paragraph>
          </Card>
        ) : (
          <Card bordered padding="$5" gap="$4">
            <Skeleton width={96} height={96} borderRadius="$6" />
            <Skeleton width="60%" height={24} />
            <Skeleton width="80%" height={18} />
          </Card>
        )}

        <SignOutButton />
      </YStack>

      <BottomSheet isVisible={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <YStack gap="$5" paddingBottom="$4">
          <YStack gap="$2" alignItems="center">
            <Text
              fontSize="$7"
              fontWeight="700"
              color="$color12"
              textAlign="center"
            >
              Edit profile
            </Text>
            <Text
              fontSize="$3"
              color="$color10"
              textAlign="center"
            >
              Update your information
            </Text>
          </YStack>

          <YStack gap="$4">
            <Input
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="FitLeap athlete"
              editable={!saving}
              autoCapitalize="words"
              borderRadius="$4"
              borderColor="$color6"
              focusStyle={{
                borderColor: "$blue10",
                shadowColor: "$blue10",
                shadowRadius: 4,
              }}
            />
            <Input
              label="Bio"
              value={bio}
              onChangeText={setBio}
              placeholder="Tell the community about your goals."
              editable={!saving}
              multiline
              numberOfLines={3}
              borderRadius="$4"
              borderColor="$color6"
              focusStyle={{
                borderColor: "$blue10",
                shadowColor: "$blue10",
                shadowRadius: 4,
              }}
            />
          </YStack>

          {error && (
            <YStack
              padding="$3"
              backgroundColor="$red3"
              borderRadius="$4"
              borderLeftWidth={4}
              borderLeftColor="$red10"
            >
              <Paragraph size="$3" color="$red11" fontWeight="500">
                {error}
              </Paragraph>
            </YStack>
          )}

          <YStack gap="$3">
            <Button
              loading={saving}
              disabled={saving || !name.trim()}
              onPress={handleSave}
              borderRadius="$6"
              shadowColor="$blue10"
              shadowRadius={8}
              shadowOpacity={0.3}
              elevation={4}
            >
              Save changes
            </Button>
            <Button
              variant="outlined"
              disabled={saving}
              onPress={() => setIsSheetOpen(false)}
              borderRadius="$6"
              borderColor="$color8"
            >
              Cancel
            </Button>
          </YStack>
        </YStack>
      </BottomSheet>
    </ScrollView>
  )
}
