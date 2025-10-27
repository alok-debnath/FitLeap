import { Text as TamaguiText, TextProps } from 'tamagui'

export interface CustomTextProps extends TextProps {
  variant?: 'heading' | 'body' | 'caption' | 'title' | 'subtitle'
}

export const Text = ({ variant, ...props }: CustomTextProps) => {
  const variantProps = {
    heading: {
      fontSize: '$7' as any,
      fontWeight: 'bold' as any,
    },
    title: {
      fontSize: '$6' as any,
      fontWeight: '600' as any,
    },
    subtitle: {
      fontSize: '$5' as any,
      color: '$colorHover' as any,
    },
    body: {
      fontSize: '$4' as any,
    },
    caption: {
      fontSize: '$3' as any,
      color: '$colorHover' as any,
    },
  }

  return (
    <TamaguiText
      {...variantProps[variant || 'body']}
      {...props}
    />
  )
}

export { TextProps }