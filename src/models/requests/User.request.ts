import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserRole } from '~/constants/enum.js'

export interface LoginReqBody {
  email: string
  password: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  forgot_password_token: string
}

export interface VerifyEmailReqBody {
  email_verify_token: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  role: UserRole
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  role: UserRole
  token_type: TokenType
}
