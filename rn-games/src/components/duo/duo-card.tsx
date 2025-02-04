import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { THEME } from '~/theme'
import { DuoInfo } from './duo-info'
import { Button } from '../button'

export interface DuoCardProps {
  id: string
  hourEnd: string
  hourStart: string
  name: string
  useVoiceChannel: boolean
  weekDays: string[]
  yearsPlaying: number
}

interface Props {
  data: DuoCardProps
  onConnect: () => void
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View className="mr-4 w-[200px] items-center rounded-lg bg-SHAPE p-5">
      <DuoInfo label="Nome" value={data.name} />

      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />

      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <Button className="w-full justify-center" onPress={onConnect}>
        <MaterialIcons name="discord" size={24} color={THEME.COLORS.WHITE} />
        <Button.Title>Conectar</Button.Title>
      </Button>
    </View>
  )
}
