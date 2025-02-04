import { useCallback, useEffect, useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { api } from '~/lib/api'
import { THEME } from '~/theme'

import { Heading } from '~/components/heading'
import type { DuoCardProps } from '~/components/duo/duo-card'
import { DuoCards } from '~/components/duo/duo-cards'
import { DuoMatch } from '~/components/duo/duo-match'
import { Loading } from '~/components/loading'

export default function Game() {
  const [duo, setDuo] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')
  const [isFetchGamesAds, setIsFetchGamesAds] = useState(false)

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 32

  const game = useLocalSearchParams<{
    id: string
    bannerUrl: string
    title: string
  }>()

  const fetchGameAds = useCallback(async () => {
    try {
      setIsFetchGamesAds(true)
      const { data } = await api.get(`/games/${game.id}/ads`)
      setDuo(data.ads)
    } catch (error) {
      Alert.alert('Error', 'Não foi possível carregar os detalhes do jogo.')
      console.log(error)
    } finally {
      setIsFetchGamesAds(false)
    }
  }, [game.id])

  const fetchDiscord = useCallback(async (adsId: string) => {
    try {
      const { data } = await api.get(`/ads/${adsId}/discord`)
      setDiscordDuoSelected(data.discord)
    } catch (error) {
      Alert.alert('Error', 'Não foi possível pega o discord.')
    }
  }, [])

  useEffect(() => {
    fetchGameAds()
  }, [fetchGameAds])

  return (
    <View className="flex-1 items-center bg-BACKGROUND_900">
      <View
        className="mt-7 w-full flex-row items-center justify-between px-8 "
        style={{ paddingTop }}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <Feather
            name="chevron-left"
            size={30}
            color={THEME.COLORS.CAPTION_400}
          />
        </TouchableOpacity>
        <Text className="font-BLACK text-LG text-WHITE">Detalhes</Text>
      </View>

      <Image
        className="mt-8 h-[160px] w-[311px] rounded-xl"
        source={{ uri: game.bannerUrl }}
        resizeMode="stretch"
      />

      <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

      {isFetchGamesAds ? (
        <Loading />
      ) : (
        <DuoCards data={duo} onGetDiscordUser={fetchDiscord} />
      )}

      <DuoMatch
        discord={discordDuoSelected}
        visible={discordDuoSelected.length > 0}
        onClose={() => setDiscordDuoSelected('')}
      />
    </View>
  )
}
