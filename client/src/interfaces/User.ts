export interface User {
    _id: string
    firstName: string
    lastName: string
    username: string
    email: string
    avatar?: string | null
    // avatar?: string | File
    password?: string
    role?: 'admin' | 'user' | 'guest'
    createdAt: Date
    updatedAt: Date
}

export interface UserLogin {
    username: string
    password: string
}

export interface UserRegister {
    firstName: string
    lastName: string
    username: string
    password: string
    confirmPassword: string
}

export interface Session {
    user?: User
    accessToken: string | null
}

export interface refreshProps {
    // refreshToken: string
}

export interface logoutProps {
    refreshToken: string
}

export interface SessionError {
    status: number
    message: string
}

export interface AuthSession {
    user: User | null
    accessToken?: string | null
    loading: boolean
}

export interface IMember {
    _id: string
    firstName: string
    lastName: string
    username: string
}

export interface getMembersOptions {
    query: string
    limit: number
    page: number
}