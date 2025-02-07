import { useCallback, useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { router } from 'expo-router'

import { api } from '~/lib/api'

import { HomeHeader } from '~/components/home-header'
import type { GameCardProps } from '~/components/game-card'
import { GamesCards } from '~/components/games-cards'
import { Heading } from '~/components/heading'
import { Loading } from '~/components/loading'

export default function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])
  const [isFetchGames, setIsFetchGames] = useState(false)

  const fetchGames = useCallback(async () => {
    try {
      setIsFetchGames(true)
      const response = await api.get('/games')
      const data = response.data
      setGames(data.games)
    } catch (error) {
      Alert.alert('Error', 'Não foi possível buscar os jogos.')
      console.log(error)
    } finally {
      setIsFetchGames(false)
    }
  }, [])

  const handleOpenGaming = useCallback(
    ({ id, bannerUrl, title }: GameCardProps) => {
      router.push({
        pathname: '/game/[id]',
        params: { id, bannerUrl, title },
      })
    },
    []
  )
  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  return (
    <View className="flex-1 bg-BACKGROUND_900">
      <HomeHeader />

      <Heading
        title="Encontre seu dou!"
        subtitle="Selecione o game que deseja jogar..."
      />

      {isFetchGames ? (
        <Loading />
      ) : (
        <GamesCards data={games} onOpenGaming={handleOpenGaming} />
      )}
    </View>
  )
}
