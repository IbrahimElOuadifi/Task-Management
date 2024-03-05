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

export const invertColor = (hex: string) => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF'
}