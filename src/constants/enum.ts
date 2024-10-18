export enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}

export enum UserRole {
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

export enum DishStatus {
  Available,
  Unavailable
}

export enum DishCategory {
  Appetizers,
  MainCourses,
  Desserts,
  Beverages
}

export enum DiscountStatus {
  Enable,
  Disable
}

export enum PaymentMethod {
  Cash,
  CreditCard
}
