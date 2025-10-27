import { ReactNode } from 'react'
import { XStack, Text } from 'tamagui'

interface HeaderProps {
  title: string
  actions?: ReactNode
}

export function Header({ title, actions }: HeaderProps) {
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      paddingVertical="$3"
      paddingHorizontal="$1"
    >
      <Text fontSize="$6" fontWeight="600" color="$color12">
        {title}
      </Text>
      {actions && (
        <XStack gap="$2" alignItems="center">
          {actions}
        </XStack>
      )}
    </XStack>
  )
}