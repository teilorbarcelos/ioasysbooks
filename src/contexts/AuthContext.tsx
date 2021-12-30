import { destroyCookie, parseCookies, setCookie } from "nookies"
import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../services/api"

interface AuthContextProps {
  user: UserProps | null
  signIn: ({ email, password }: CredentialsProps) => Promise<void>
  logOut: () => void
  loginError: boolean
}

export interface CredentialsProps {
  email: string
  password: string
}

interface AuthProviderProps {
  children: ReactNode
}

interface UserProps {
  id: string
  name: string
  birthdate: string
  gender: string
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loginError, setLoginError] = useState(false)

  async function signIn({ email, password }: CredentialsProps) {

    try {
      const response = await api.post<UserProps>('/auth/sign-in', {
        email,
        password
      })

      setCookie(undefined, 'ioasysbooks.token', response.headers.authorization, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'ioasysbooks.user', JSON.stringify(response.data), {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      api.defaults.headers.common.authorization = `Bearer ${response.headers.authorization}`

      setUser(response.data)

      setLoginError(false)
    } catch (error) {
      setLoginError(true)
    }
  }

  async function logOut() {
    destroyCookie(undefined, 'ioasysbooks.token')
    destroyCookie(undefined, 'ioasysbooks.user')
    setUser(null)
  }

  useEffect(() => {
    const { 'ioasysbooks.token': authorization } = parseCookies()
    const { 'ioasysbooks.user': storedUser } = parseCookies()

    if (authorization && storedUser) {
      api.defaults.headers.common.authorization = `Bearer ${authorization}`
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, loginError, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}