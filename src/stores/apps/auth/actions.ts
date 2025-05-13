import { createAsyncThunk } from "@reduxjs/toolkit"

// ** services
import { changePasswordMe, registerAuth, updateAuthMe } from "src/services/auth"
import { TChangePassword } from "src/types/auth"

export const registerAuthAsync = createAsyncThunk(
  'auth/register',
  async (data: any) => {
    
      const response = await registerAuth(data)
      console.log("response registerAuthAsync",{response})
      if(response?.data){
        return response
      }
      
      return{
        data: null,
        message: response?.response?.data?.message,
        typeError: response?.response?.data?.typeError

      }
    }
  
)

export const updateAuthMeAsync = createAsyncThunk(
  'auth/update-me',
  async (data: any) => {
    
      const response = await updateAuthMe(data)
      
      if(response?.data){
        return response
      }
      
      return{
        data: null,
        message: response?.response?.data?.message,
        typeError: response?.response?.data?.typeError
      }
    })

export const changePasswordMeAsync = createAsyncThunk(
  'auth/change-password-me',
  async (data: TChangePassword) => {
    
      const response = await changePasswordMe(data)
      console.log("response changePasswordMeAsync",{response})
      if(response?.status === "Success"){
        return {...response, data: 1}
      }
      
      return{
        data: null,
        message: response?.response?.data?.message,
        typeError: response?.response?.data?.typeError
      }
    })