import { LucideProps } from 'lucide-react-native'
import { ComponentType } from 'react'

interface IconProps extends LucideProps {
  name: ComponentType<LucideProps>
}

export const Icon = ({ name: IconComponent, ...props }: IconProps) => {
  return <IconComponent {...props} />
}