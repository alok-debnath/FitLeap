import { useCallback } from 'react'
import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

// Web-compatible storage implementation
const webStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, value)
  },
  removeItem: async (key: string): Promise<void> => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },
}

// Platform-specific storage interface
const createStorage = () => {
  if (Platform.OS === 'web') {
    return webStorage
  }
  return {
    getItem: SecureStore.getItemAsync,
    setItem: SecureStore.setItemAsync,
    removeItem: SecureStore.deleteItemAsync,
  }
}

export const useSecureStorage = () => {
  const storage = createStorage()

  const getItem = useCallback(
    async (key: string, options?: SecureStore.SecureStoreOptions) => {
      return storage.getItem(key)
    },
    [storage]
  )

  const setItem = useCallback(
    async (key: string, value: string, options?: SecureStore.SecureStoreOptions) => {
      return storage.setItem(key, value)
    },
    [storage]
  )

  const removeItem = useCallback(
    async (key: string, options?: SecureStore.SecureStoreOptions) => {
      return storage.removeItem(key)
    },
    [storage]
  )

  return {
    getItem,
    setItem,
    removeItem,
  }
}

// Export storage object for direct use (like in ConvexAuthProvider)
export const createSecureStorage = () => {
  const storage = createStorage()

  return {
    getItem: storage.getItem,
    setItem: storage.setItem,
    removeItem: storage.removeItem,
  }
}
