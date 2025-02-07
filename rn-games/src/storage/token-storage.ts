import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN_STORAGE_KEY = 'access_token'

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
  } catch (error) {
    throw error
  }
}

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_STORAGE_KEY)
  } catch (error) {
    throw error
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
  } catch (error) {
    throw error
  }
}
