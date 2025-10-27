import { Input as TamaguiInput, InputProps, Paragraph, Text, YStack } from 'tamagui'

export interface CustomInputProps extends Omit<InputProps, 'size'> {
  label?: string
  helperText?: string
}

export const Input = ({ label, helperText, ...props }: CustomInputProps) => (
  <YStack gap="$2">
    {label && (
      <Text fontSize="$3" fontWeight="500" color="$color12">
        {label}
      </Text>
    )}
    <TamaguiInput
      size="$4"
      borderRadius="$4"
      borderColor="$color6"
      borderWidth="$0.5"
      backgroundColor="$color1"
      paddingHorizontal="$3"
      paddingVertical="$2"
      {...props}
    />
    {helperText && (
      <Paragraph size="$2" color="$color11">
        {helperText}
      </Paragraph>
    )}
  </YStack>
)

export { InputProps }