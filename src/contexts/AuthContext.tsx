// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** services
import { loginAuth, logoutAuth } from 'src/services/auth'

// ** configs
import { CONFIG_API } from 'src/configs/api'

// ** helpers
import { clearLocalUserData, setLocalUserData } from 'src/helpers/storage'

// instanceAxios
import instanceAxios from 'src/helpers/axios'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await instanceAxios
          .get(CONFIG_API.AUTH.AUTH_ME)
          .then(async response => {
            console.log('response', { response })
            setLoading(false)
            setUser({ ...response.data.data })
          })
          .catch(() => {
            clearLocalUserData()
            setUser(null)
            setLoading(false)
            if (!router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    //axios.post(authConfig.loginEndpoint, params)
    loginAuth({ email: params.email, password: params.password })
      .then(async response => {
        params.rememberMe
          ? setLocalUserData(
              JSON.stringify(response.data.user),
              response.data.access_token,
              response.data.refresh_token
            )
          : null
        const returnUrl = router.query.returnUrl
        console.log('response', { response })
        setUser({ ...response.data.user })

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    logoutAuth().then(() => {
      setUser(null)
      clearLocalUserData()
      router.push('/login')
    })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
