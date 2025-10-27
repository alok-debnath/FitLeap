import { useState, useEffect } from 'react';
import { Appearance, ColorSchemeName, useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type Mode = 'light' | 'dark' | 'system';

interface UseModeToggleReturn {
  isDark: boolean;
  mode: Mode;
  setMode: (mode: Mode) => void;
  currentMode: ColorSchemeName;
  toggleMode: () => void;
}

const MODE_STORAGE_KEY = 'theme_mode';

export function useModeToggle(): UseModeToggleReturn {
  const [mode, setModeState] = useState<Mode>('system');
  const [isInitialized, setIsInitialized] = useState(false);
  const colorScheme = useColorScheme();

  // Calculate the effective color scheme based on mode and system preference
  const getEffectiveColorScheme = (currentMode: Mode, systemScheme: ColorSchemeName): 'light' | 'dark' => {
    if (currentMode === 'system') {
      return systemScheme || 'light';
    }
    return currentMode;
  };

  const effectiveScheme = getEffectiveColorScheme(mode, colorScheme);
  const isDark = effectiveScheme === 'dark';

  // Load persisted mode on mount
  useEffect(() => {
    const loadPersistedMode = async () => {
      try {
        const storedMode = await SecureStore.getItemAsync(MODE_STORAGE_KEY);
        if (storedMode && ['light', 'dark', 'system'].includes(storedMode)) {
          setModeState(storedMode as Mode);
        }
      } catch (error) {
        console.warn('Failed to load theme mode:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadPersistedMode();
  }, []);

  // Apply the color scheme when mode changes
  useEffect(() => {
    if (!isInitialized) return;

    if (mode === 'system') {
      Appearance.setColorScheme(null); // Reset to system default
    } else {
      Appearance.setColorScheme(mode);
    }
  }, [mode, isInitialized]);

  const toggleMode = () => {
    const nextMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
    setMode(nextMode);
  };

  const setMode = async (newMode: Mode) => {
    setModeState(newMode);

    try {
      await SecureStore.setItemAsync(MODE_STORAGE_KEY, newMode);
    } catch (error) {
      console.warn('Failed to save theme mode:', error);
    }

    if (newMode === 'system') {
      Appearance.setColorScheme(null);
    } else {
      Appearance.setColorScheme(newMode);
    }
  };

  return {
    isDark,
    mode,
    setMode,
    currentMode: colorScheme,
    toggleMode,
  };
}
