import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '~/hooks/user-auth'

export function HomeHeader() {
  const { logout, user } = useAuth()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 32

  async function handleLogout() {
    await logout()
    router.navigate('/')
  }

  return (
    <View
      className="w-full flex-row items-center bg-[#29292E] p-8"
      style={{ paddingTop }}
    >
      <Image
        className="h-[54px] w-[54px] rounded-lg "
        source={{ uri: user.avatarUrl }}
      />

      <View className="ml-4 flex-1">
        <Text className="font-REGULAR text-MD text-WHITE">Olá</Text>
        <Text className="font-BOLD text-LG text-WHITE">{user.name}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Feather name="power" size={32} color={'#7C7C8A'} />
      </TouchableOpacity>
    </View>
  )
}
