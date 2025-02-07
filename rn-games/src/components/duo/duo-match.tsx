import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Modal,
  Text,
  View,
  type ModalProps,
} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { Button } from '../button'
import { MaterialIcons } from '@expo/vector-icons'
import { THEME } from '~/theme'
import { Heading } from '../heading'

interface DuoMatchProps extends ModalProps {
  discord: string
  onClose: VoidFunction
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
  async function handleCopyDiscordToClipboard() {
    await Clipboard.setStringAsync(discord)
    Alert.alert(
      'Discord copiado!',
      'Usuário copiado pra você colocar no Discord'
    )
    setIsCoping(false)
  }

  const [isCoping, setIsCoping] = useState(false)
  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View className="flex-1 items-center justify-center bg-OVERLAY">
        <View className="w-[311px] items-center justify-center rounded-lg bg-SHAPE">
          <Button className="m-4 self-end bg-SHAPE" onPress={onClose}>
            <MaterialIcons
              name="close"
              size={24}
              color={THEME.COLORS.CAPTION_500}
            />
          </Button>

          <MaterialIcons
            name="check-circle"
            size={128}
            color={THEME.COLORS.SUCCESS}
          />

          <Heading
            className="mt-6 items-center"
            title="Vamos jogar!"
            subtitle="Agora é só começar a jogar!"
          />

          <Text className="mt-6 mb-4 font-BOLD text-MD text-WHITE">
            Adicione no Discord
          </Text>

          <Button
            className="mb-10 h-12 w-[231px] items-center justify-center rounded-[4px] bg-BACKGROUND_900"
            onPress={handleCopyDiscordToClipboard}
            isLoading={isCoping}
          >
            <Button.Title className="font-REGULAR text-MD text-WHITE">
              {isCoping ? (
                <ActivityIndicator className="text-PRIMARY" />
              ) : (
                discord
              )}
            </Button.Title>
          </Button>
        </View>
      </View>
    </Modal>
  )
}
