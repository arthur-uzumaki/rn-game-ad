import { LinearGradient } from 'expo-linear-gradient'
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'

export interface GameCardProps {
  id: string
  title: string
  _count: {
    ads: number
  }
  bannerUrl: string
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps
}
export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity className="mr-6" {...rest}>
      <ImageBackground
        className="h-full w-96 justify-end overflow-hidden rounded-lg"
        source={{ uri: data.bannerUrl }}
        resizeMode="stretch"
      >
        <LinearGradient
          className="h-[70px] w-full justify-end p-4"
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
        >
          <Text className="font-BOLD text-MD text-WHITE">{data.title}</Text>

          <Text className="font-REGULAR text-CAPTION_300 text-MD">
            {data._count.ads} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
}
