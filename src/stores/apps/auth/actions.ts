import { createAsyncThunk } from "@reduxjs/toolkit"

// ** services
import { registerAuth, updateAuthMe } from "src/services/auth"

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