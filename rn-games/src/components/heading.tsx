import { Text, View, type ViewProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

interface HeadingProps extends ViewProps {
  title: string
  subtitle: string
}

export function Heading({ title, subtitle, className, ...rest }: HeadingProps) {
  return (
    <View className={twMerge('w-full p-8', className)} {...rest}>
      <Text className="font-BLACK text-LG text-WHITE">{title}</Text>
      <Text className="font-REGULAR text-CAPTION_400 text-MD">{subtitle}</Text>
    </View>
  )
}
