export enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}

export enum UserRole {
  Customer,
  Staff,
  Manager
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

export enum TableStatus {
  Available,
  Reserved,
  Occupied
}
