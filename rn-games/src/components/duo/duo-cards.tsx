import { FlatList, Text } from 'react-native'
import { type DuoCardProps, DuoCard } from './duo-card'
import clsx from 'clsx'

interface DuoCardsProps {
  data: DuoCardProps[]
  onGetDiscordUser: (adsId: string) => void
}

export function DuoCards({ data, onGetDiscordUser }: DuoCardsProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      className="w-full "
      contentContainerClassName={clsx({
        'pl-8 pr-16 items-start': data.length > 0,
        'flex-1 justify-center items-center': data.length === 0,
      })}
      renderItem={({ item }) => (
        <DuoCard data={item} onConnect={() => onGetDiscordUser(item.id)} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={
        <Text className="font-REGULAR text-CAPTION_300 text-SM">
          Não há anúncios publicados ainda.
        </Text>
      }
    />
  )
}
