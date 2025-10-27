import { Button } from 'tamagui'
import { useModeToggle } from '../../hooks/useModeToggle'

export const ModeToggle = () => {
  const { toggleMode, mode } = useModeToggle()

  return (
    <Button
      onPress={toggleMode}
      variant="outlined"
      size="$3"
    >
      {mode === 'dark' ? '☀️ Light' : mode === 'light' ? '🌙 Dark' : '🔄 System'}
    </Button>
  )
}