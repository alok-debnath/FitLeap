import type { ReactNode } from 'react'
import { Sheet, SheetProps, YStack, useTheme } from 'tamagui'

export interface BottomSheetProps extends Omit<SheetProps, 'open' | 'onOpenChange'> {
  children: ReactNode
  isVisible?: boolean
  isOpen?: boolean
  onClose: () => void
}

export const BottomSheet = ({ children, isVisible, isOpen, onClose, ...props }: BottomSheetProps) => {
  const open = isVisible ?? isOpen ?? false
  const theme = useTheme()

  return (
    <Sheet
      modal
      open={open}
      onOpenChange={(next: boolean) => {
        if (!next) {
          onClose()
        }
      }}
      snapPoints={[85]}
      snapPointsMode="percent"
      dismissOnSnapToBottom
      dismissOnOverlayPress
      {...props}
    >
      <Sheet.Overlay
        backgroundColor="rgba(0, 0, 0, 0.5)"
        opacity={0.8}
      />
      <Sheet.Handle
        backgroundColor={theme.color6.val}
        opacity={0.6}
        borderRadius={3}
        width={40}
        height={4}
        alignSelf="center"
        marginVertical="$2"
      />
      <Sheet.Frame
        padding="$6"
        gap="$5"
        backgroundColor={theme.background.val}
        borderTopLeftRadius="$8"
        borderTopRightRadius="$8"
        shadowColor="rgba(0, 0, 0, 0.15)"
        shadowOffset={{ width: 0, height: -4 }}
        shadowOpacity={1}
        shadowRadius={12}
        elevation={8}
        flex={1}
      >
        <YStack gap="$4">
          {children}
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}