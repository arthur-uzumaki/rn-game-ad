import { FlatList } from 'react-native'
import { type GameCardProps, GameCard } from './game-card'

interface Props {
  data: GameCardProps[]
  onOpenGaming: (game: GameCardProps) => void
}

export function GamesCards({ data, onOpenGaming }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <GameCard data={item} onPress={() => onOpenGaming(item)} />
      )}
      contentContainerClassName="pl-8 pr-16"
      horizontal
      getItemLayout={(_, index) => ({
        length: 150,
        offset: 150 * index,
        index,
      })}
      showsHorizontalScrollIndicator={false}
    />
  )
}
