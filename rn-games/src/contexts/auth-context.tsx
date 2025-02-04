import { createContext, useEffect, useState, type ReactNode } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { env } from '~/env/env'
import { api } from '~/lib/api'
import { getToken, removeToken, saveToken } from '~/storage/token-storage'
import { router } from 'expo-router'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: env.EXPO_PUBLIC_CLIENT_ID_IOS,
})

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  signIn: () => Promise<void>
  logout: () => Promise<void>
  isUserLoading: boolean
}

interface AuthProvider {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProvider) {
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [accessToken, setAccessToken] = useState('')

  async function signIn() {
    try {
      setIsUserLoading(true)
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      await GoogleSignin.signIn()

      const tokens = await GoogleSignin.getTokens()
      const accessToken = tokens.accessToken

      if (accessToken) {
        const { data } = await api.post('/sessions', {
          idToken: accessToken,
        })
        const token = await data.token

        setAccessToken(token)
        await saveToken(token)

        await signInWithGoogle(token)

        await signInWithGoogle(token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function logout() {
    try {
      await GoogleSignin.signOut()
      await removeToken()
      setUser({} as UserProps)
      setAccessToken('')
    } catch (error) {
      throw error
    }
  }

  async function signInWithGoogle(token: string) {
    try {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const userInfoResponse = await api.get('/me')
      setUser(userInfoResponse.data.user)
    } catch (error) {
      console.log('Erro ao buscar usuário:', error)
    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if (accessToken && user.name) {
      router.replace('/home')
    }
  }, [accessToken, user.name])

  useEffect(() => {
    async function loadStoredToken() {
      const storedToken = await getToken()
      if (storedToken) {
        setAccessToken(storedToken)

        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
        await signInWithGoogle(storedToken)
      }
    }

    loadStoredToken()
  }, [])

  return (
    <AuthContext.Provider value={{ isUserLoading, signIn, user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
