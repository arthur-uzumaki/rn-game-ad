import React from 'react'
import '~/styles/global.css'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Loading } from '~/components/loading'
import { AuthContextProvider } from '~/contexts/auth-context'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  })

  if (!fontsLoaded) {
    return (
      <>
        <Loading />
        <StatusBar style="light" backgroundColor="transparent" translucent />
      </>
    )
  }

  return (
    <SafeAreaProvider className="flex-1 bg-BACKGROUND_900 ">
      <AuthContextProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="light" backgroundColor="transparent" translucent />
      </AuthContextProvider>
    </SafeAreaProvider>
  )
}
