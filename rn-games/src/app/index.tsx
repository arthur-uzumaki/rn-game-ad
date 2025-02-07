import { router } from 'expo-router'
import { Alert, View } from 'react-native'
import { Button } from '~/components/button'
import { useAuth } from '~/hooks/user-auth'

export default function Signin() {
  const { isUserLoading, signIn } = useAuth()

  async function handleSignIn() {
    try {
      await signIn()
      router.navigate('/home')
    } catch (error) {
      Alert.alert('Entrar', 'Não foi possível conecta-se a sua conta google.')
      console.log(error)
    }
  }
  return (
    <View className="flex-1 items-center justify-center bg-BACKGROUND_900">
      <Button isLoading={isUserLoading} onPress={handleSignIn}>
        <Button.Icon icon="chrome" />
        <Button.Title>Entrar no google</Button.Title>
      </Button>
    </View>
  )
}
