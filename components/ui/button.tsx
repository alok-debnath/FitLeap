import { Button as TamaguiButton, ButtonProps as TamaguiButtonProps, XStack, useTheme, Text } from 'tamagui'
import { ActivityIndicator } from 'react-native'
import { forwardRef } from 'react'
import * as Haptics from 'expo-haptics'

export interface ButtonProps extends Omit<TamaguiButtonProps, 'icon' | 'iconAfter'> {
  haptic?: boolean
  loading?: boolean
  icon?: TamaguiButtonProps['icon']
  iconAfter?: TamaguiButtonProps['iconAfter']
}

export const Button = forwardRef<any, ButtonProps>(
  ({ haptic = true, loading, icon, iconAfter, onPress, onPressIn, children, ...props }, ref) => {
    const theme = useTheme()

    const handlePressIn = (event: any) => {
      if (haptic && process.env.EXPO_OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
      onPressIn?.(event)
    }

    const handlePress = (event: any) => {
      if (!loading) {
        onPress?.(event)
      }
    }

    return (
      <TamaguiButton
        ref={ref}
        onPress={handlePress}
        onPressIn={handlePressIn}
        pressStyle={{ scale: 0.97 }}
        disabled={loading || props.disabled}
        icon={!loading ? icon : undefined}
        iconAfter={!loading ? iconAfter : undefined}
        {...props}
      >
        {loading ? (
          <XStack gap="$2" alignItems="center" justifyContent="center">
            <ActivityIndicator size="small" color={theme?.color?.val ?? undefined} />
            <Text>{children}</Text>
          </XStack>
        ) : (
          <Text>{children}</Text>
        )}
      </TamaguiButton>
    )
  }
)

Button.displayName = 'Button'