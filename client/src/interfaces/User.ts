export interface User {
    id: string
    firstName: string
    lastName: string
    username: string
    password: string
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

export interface SessionError {
    status: number
    message: string
}

export interface AuthSession {
    user: User | null
    token?: string | null
    error: SessionError | null
}