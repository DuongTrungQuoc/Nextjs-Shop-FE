export type ErrCallbackType = (err: any) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: {
    name: string,
    permissions: string[]
  }
  email: string
  firstName: string
  lastName: string
  middleName: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
