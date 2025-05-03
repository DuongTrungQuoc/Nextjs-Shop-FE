import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from 'src/configs/auth'

export const setLocalUserData = (userData: string, accessToken: string, refreshToken: string) => {
  if(typeof window !== 'undefined')  {
    window.localStorage.setItem(USER_DATA, userData),
    window.localStorage.setItem(ACCESS_TOKEN, accessToken),
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken)
  }
}

export const getLocalUserData = () => {
  if(typeof window !== 'undefined') {
  return {
    userData: window.localStorage.getItem(USER_DATA),
    accessToken: window.localStorage.getItem(ACCESS_TOKEN),
    refreshToken: window.localStorage.getItem(REFRESH_TOKEN)
    }
  }

  // If window is not defined, return empty strings
  return {
  userData: "",
  accessToken: "",
  refreshToken: ""
  }
}

export const clearLocalUserData = () => {
  if(typeof window !== 'undefined'){
    window.localStorage.removeItem(USER_DATA)
    window.localStorage.removeItem(ACCESS_TOKEN)
    window.localStorage.removeItem(REFRESH_TOKEN)
  }
  
}
