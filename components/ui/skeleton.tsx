import { View, ViewProps } from 'tamagui'

export interface SkeletonProps extends ViewProps {
  width?: number | string
  height?: number | string
}

export const Skeleton = ({ width = '100%', height = 20, ...props }: SkeletonProps) => {
  return (
    <View
      width={width}
      height={height}
  backgroundColor="$color4"
      borderRadius="$2"
      {...props}
    />
  )
}