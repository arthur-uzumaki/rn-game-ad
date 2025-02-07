import { useContext } from 'react'
import { AuthContext, type AuthContextDataProps } from '~/contexts/auth-context'

export function useAuth(): AuthContextDataProps {
  const context = useContext(AuthContext)
  return context
}
