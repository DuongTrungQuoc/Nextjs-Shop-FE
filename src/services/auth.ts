import axios from "axios";

// ** config
import { CONFIG_API } from "src/configs/api";
import instanceAxios from "src/helpers/axios";

// ** Types
import { TLoginAuth, TRegisterAuth, TChangePassword } from "src/types/auth";


export const loginAuth = async (data: TLoginAuth) => {
  
    const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/login`,data)

    return res.data
  
}

export const logoutAuth = async () => {
  try {
    const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/logout`)

    return res.data
  } catch (error) {
    return null
  }
}

export const registerAuth = async (data: TRegisterAuth) => {
  try {
    const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/register`,data)

    return res.data
  } catch (error) {
    return error
  }
}

export const updateAuthMe = async (data: any) => {
  try {
    const res = await instanceAxios.put(`${CONFIG_API.AUTH.INDEX}/me`,data)

    return res.data
  } catch (error) {
    return error
  }
}

export const getAuthMe = async () => {
  try {
    const res = await instanceAxios.get(`${CONFIG_API.AUTH.INDEX}/me`)

    return res.data
  } catch (error) {
    return error
  }
}

export const changePasswordMe = async (data: TChangePassword) => {
  try {
    const res = await instanceAxios.patch(`${CONFIG_API.AUTH.INDEX}/change-password`,data)

    return res.data
  } catch (error) {
    return error
  }
}

