import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosResponse } from 'axios'
import { User } from '@interfaces/User'
import { refreshSession } from 'api/auth'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleTokenRefresh = async () => {
  try {
    const { data: { accessToken, user } } = await refreshSession() as AxiosResponse<{ user: User, accessToken: string }>
    localStorage.setItem('accessToken', accessToken)
    return { accessToken, user }
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
    }
    throw new Error(error.message)
  }
}

export const checkTokenIsExpired = (token: string | null) => {
  if (!token) return true;
  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload));
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now || Date.now() - decoded.iat < 2000;
};
