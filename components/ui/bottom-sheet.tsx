import type { ReactNode } from 'react'
import { Sheet, SheetProps, YStack } from 'tamagui'

export interface BottomSheetProps extends Omit<SheetProps, 'open' | 'onOpenChange'> {
  children: ReactNode
  isVisible?: boolean
  isOpen?: boolean
  onClose: () => void
}

export const BottomSheet = ({ children, isVisible, isOpen, onClose, ...props }: BottomSheetProps) => {
  const open = isVisible ?? isOpen ?? false

  return (
    <Sheet
      modal
      open={open}
      onOpenChange={(next: boolean) => {
        if (!next) {
          onClose()
        }
      }}
      snapPoints={[80]}
      snapPointsMode="percent"
      dismissOnSnapToBottom
      {...props}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame
        padding="$5"
        gap="$4"
        backgroundColor="$background"
        borderTopLeftRadius="$6"
        borderTopRightRadius="$6"
      >
        <YStack gap="$3">
          {children}
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}