import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'

export function SetNavigationBarColor() {
  useEffect(() => {
    if (typeof window === 'undefined' && NavigationBar.setBackgroundColorAsync) {
      NavigationBar.setBackgroundColorAsync('transparent')
    }
  }, [])

  return null
}
