import { type ColorValue, Text, View } from 'react-native'
import { THEME } from '~/theme'

interface DuoInfoProps {
  label: string
  value: string
  colorValue?: ColorValue
}

export function DuoInfo({
  label,
  value,
  colorValue = THEME.COLORS.WHITE,
}: DuoInfoProps) {
  return (
    <View className="mb-4 w-full">
      <Text className="mb-1 font-REGULAR text-CAPTION_300 text-SM">
        {label}
      </Text>

      <Text
        className="font-BOLD text-SM"
        numberOfLines={1}
        style={{ color: colorValue }}
      >
        {value}
      </Text>
    </View>
  )
}
