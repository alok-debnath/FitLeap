import { Button } from 'tamagui'
import { useModeToggle } from '../../hooks/useModeToggle'

export const ModeToggle = () => {
  const { toggleMode, mode } = useModeToggle()

  const getButtonText = () => {
    switch (mode) {
      case 'light':
        return '🌙 Dark';
      case 'dark':
        return '🔄 System';
      case 'system':
        return '☀️ Light';
      default:
        return '🌙 Dark';
    }
  };

  return (
    <Button
      onPress={toggleMode}
      variant="outlined"
      size="$3"
    >
      {getButtonText()}
    </Button>
  )
}