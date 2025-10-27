// Simple tabs implementation using Tamagui components
import { YStack, XStack, Button } from 'tamagui'
import { ReactNode, useState } from 'react'

export interface TabItem {
  key: string
  title: string
  content: ReactNode
}

export interface TabsProps {
  tabs: TabItem[]
  defaultValue?: string
}

export const Tabs = ({ tabs, defaultValue }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.key || '')

  const activeTabContent = tabs.find(tab => tab.key === activeTab)?.content

  return (
    <YStack>
      <XStack space="$2" justifyContent="center" marginBottom="$4">
        {tabs.map(tab => (
          <Button
            key={tab.key}
            flex={1}
            variant={activeTab === tab.key ? 'outlined' : undefined}
            onPress={() => setActiveTab(tab.key)}
          >
            {tab.title}
          </Button>
        ))}
      </XStack>
      {activeTabContent}
    </YStack>
  )
}

export const TabsList = ({ children }: { children: ReactNode }) => (
  <XStack space="$2" justifyContent="center" marginBottom="$4">
    {children}
  </XStack>
)

export const TabsTrigger = ({ children, ...props }: any) => (
  <Button flex={1} {...props}>
    {children}
  </Button>
)

export const TabsContent = ({ children }: { children: ReactNode }) => (
  <>{children}</>
)