import User from '~/models/schemas/User.schema.js'
import databaseService from './database.services.js'
import { RegisterReqBody } from '~/models/requests/User.request.js'
import { hashPassword } from '~/utils/crypto.js'
import { signToken } from '~/utils/jwt.js'
import { TokenType, UserRole, UserVerifyStatus } from '~/constants/enum.js'
import RefreshToken from '~/models/schemas/RefreshToken.schema.js'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USER_MESSAGE } from '~/constants/message.js'
config()

class UsersService {
  private signAccessToken(user_id: string, role: UserRole) {
    return signToken({
      payload: {
        user_id,
        role,
        token_type: TokenType.AccessToken
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken(user_id: string, role: UserRole) {
    return signToken({
      payload: {
        user_id,
        role,
        token_type: TokenType.RefreshToken
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signEmailVerifyToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken
      },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      options: {
        expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN
      }
    })
  }

  private signForgotPasswordToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
      options: {
        expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessAndRefreshToken(user_id: string, role: UserRole) {
    return Promise.all([this.signAccessToken(user_id, role), this.signRefreshToken(user_id, role)])
  }

  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken(user_id.toString())
    await databaseService.users.insertOne(
      new User({
        ...payload,
        email_verify_token,
        _id: user_id,
        password: hashPassword(payload.password)
      })
    )

    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id.toString(), payload.role)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, role: payload.role })
    )
    return {
      access_token,
      refresh_token
    }
  }

  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async login(user_id: string, role: number) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id, role)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, role: role })
    )
    return {
      access_token,
      refresh_token
    }
  }

  async logout(refresh_token: string) {
    await databaseService.refreshTokens.deleteOne({ token: refresh_token })
    return {
      message: USER_MESSAGE.LOGOUT_SUCCESS
    }
  }

  async verifyEmail(user_id: string, role: UserRole) {
    const [updateResult, [access_token, refresh_token]] = await Promise.all([
      databaseService.users.updateOne(
        { _id: new ObjectId(user_id) },
        {
          $set: {
            email_verify_token: '',
            verify: UserVerifyStatus.Verified
          },
          $currentDate: {
            updated_at: true
          }
        }
      ),
      this.signAccessAndRefreshToken(user_id, role)
    ])

    return {
      access_token,
      refresh_token
    }
  }

  async resendVerifyEmail(user_id: string) {
    const email_verify_token = await this.signEmailVerifyToken(user_id)
    // Update Email verify token in document user
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: {
          email_verify_token
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    return {
      message: USER_MESSAGE.RESEND_VERIFY_EMAIL_SUCCESS
    }
  }

  async forgotPassword(user_id: string) {
    const forgot_password_token = await this.signForgotPasswordToken(user_id)
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: {
          forgot_password_token
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    // Send email with a link: https://cuisine-craze.com/forgot-password?token=token
    return {
      message: USER_MESSAGE.CHECK_EMAIL_TO_RESET_PASSWORD
    }
  }

  async resetPassword(user_id: string, password: string) {
    databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: {
          forgot_password_token: '',
          password: hashPassword(password)
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    return {
      message: USER_MESSAGE.RESET_PASSWORD_SUCCESS
    }
  }
  async getMe(user_id: string) {
    const user = await databaseService.users.findOne(
      { _id: new ObjectId(user_id) },
      {
        projection: {
          password: 0,
          forgot_password_token: 0,
          email_verify_token: 0
        }
      }
    )
    return user
  }
}

const usersService = new UsersService()
export default usersService
