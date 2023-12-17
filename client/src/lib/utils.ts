import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosResponse } from 'axios'
import { User } from '@interfaces/User'
import { refreshSession } from 'api/auth'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleTokenRefresh = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if(refreshToken) {
    try {
      const { data: { accessToken, user } } = await refreshSession({ refreshToken }) as AxiosResponse<{ user: User, accessToken: string }>
      localStorage.setItem('accessToken', accessToken)
      return { accessToken, user }
    } catch (error: any) {
      throw new Error(error.message)
    }
  } else {
    localStorage.removeItem('accessToken')
    throw new Error('no refresh token')
  }
}