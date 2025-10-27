import { KeyboardAvoidingView, Platform } from 'react-native'
import { YStack, YStackProps } from 'tamagui'

export interface AvoidKeyboardProps extends YStackProps {
  children: React.ReactNode
}

export const AvoidKeyboard = ({ children, ...props }: AvoidKeyboardProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <YStack flex={1} {...props}>
        {children}
      </YStack>
    </KeyboardAvoidingView>
  )
}