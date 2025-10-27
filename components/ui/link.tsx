import { Anchor, AnchorProps } from 'tamagui'
import { Link as ExpoRouterLink } from 'expo-router'
import { ComponentProps } from 'react'

export interface LinkProps extends Omit<AnchorProps, 'href'> {
  href: ComponentProps<typeof ExpoRouterLink>['href']
  asChild?: boolean
  children: React.ReactNode
}

export const Link = ({ href, asChild, children, ...props }: LinkProps) => (
  <ExpoRouterLink href={href} asChild={asChild}>
    {asChild ? (
      children
    ) : (
  <Anchor color="$color10" textDecorationLine="underline" {...props}>
        {children}
      </Anchor>
    )}
  </ExpoRouterLink>
)