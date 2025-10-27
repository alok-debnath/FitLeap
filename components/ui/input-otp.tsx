import { Input, InputProps } from 'tamagui'
import { useState } from 'react'

export interface InputOTPProps extends Omit<InputProps, 'value' | 'onChangeText'> {
  length?: number
  onComplete?: (code: string) => void
}

export const InputOTP = ({ length = 6, onComplete, ...props }: InputOTPProps) => {
  const [value, setValue] = useState('')

  const handleChange = (text: string) => {
    // Only allow numeric input
    const numericText = text.replace(/[^0-9]/g, '').slice(0, length)
    setValue(numericText)

    if (numericText.length === length && onComplete) {
      onComplete(numericText)
    }
  }

  return (
    <Input
      value={value}
      onChangeText={handleChange}
      keyboardType="numeric"
      maxLength={length}
      textAlign="center"
      fontSize="$6"
      letterSpacing="$2"
      {...props}
    />
  )
}