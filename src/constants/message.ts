export const USER_MESSAGE = {
  VALIDATION_ERROR: 'Validation error',
  EMAIL_ALREADY_EXIST: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_STRING: 'Password must be a string',
  PASSWORD_LENGTH: 'Password must be from 6 to 50 characters',
  PASSWORD_STRONG:
    'Password must be 6-50 characters long, at least one lowercase letter, one uppercase letter, one number, one symbol',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm Password must be required',
  CONFIRM_PASSWORD_MUST_BE_STRING: 'Confirm Password must be a string',
  CONFIRM_PASSWORD_MATCHED: 'Confirm Password does not matched',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_STRING: 'Name must be a string',
  NAME_LENGTH: 'Name length must be from 1 to 100 characters',
  USER_NOT_FOUND: 'Email or password is not correct',
  LOGIN_SUCCESSFUL: 'Login success',
  REGISTER_SUCCESSFUL: 'Register success',
  EMPTY_ACCESS_TOKEN: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  LOGOUT_SUCCESS: 'Logout success',
  ACCESS_TOKEN_IS_INVALID: 'Access token is invalid',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verification token is required',
  EMAIL_VERIFIED: 'Email verification token is verified already',
  EMAIL_VERIFIED_SUCCESS: 'Email verified successfully',
  EMAIL_VERIFY_TOKEN_IS_INVALID: 'Email verification token is invalid',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend email verification success',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password is required',
  FORGOT_PASSWORD_TOKEN_IS_INVALID: 'Forgot password is invalid',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify password is success',
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  GET_ME_SUCCESS: 'Get user profile success'
}

export const ROLE_MESSAGE = {
  CAN_NOT_DO_THIS_ACTION: 'This account can not do this action'
}

export const TABLE_MESSAGE = {
  TABLE_NUMBER_IS_REQUIRED: 'Table number is required',
  TABLE_NUMBER_EXISTS: 'Table number already exists',
  CREATE_TABLE_SUCCESS: 'Create table success',
  UPDATE_TABLE_SUCCESS: 'Update table success',
  CAPACITY_IS_REQUIRED: 'Capacity is required',
  CAPACITY_IS_NUMBER: 'Capacity must be a number',
  TABLE_NAME_IS_STRING: 'Table number must be a string',
  TABLE_NAME_LENGTH: 'Table length is from 2 to 10 characters'
}

export const DISH_MESSAGE = {
  DISH_NAME_IS_REQUIRED: 'Dish name is required',
  DISH_NAME_EXISTS: 'This dish already exists',
  CREATE_DISH_SUCCESS: 'Create dish success',
  DISH_DESCRIPTION_LENGTH: 'Description length maximums 255 characters',
  DISH_NAME_LENGTH: 'Name length is from 6 to 255 characters ',
  DISH_PRICE_NUMBER: 'Dish price must be a number',
  UPDATE_DISH_SUCCESS: 'Update dish success',
  DISH_NAME_IS_STRING: 'Dish name must be a string',
  DISH_PRICE_REQUIRED: 'Dish price is required',
  GET_ALL_DISHES_SUCCESS: 'Get all dishes success',
  GET_DISH_SUCCESS: 'Get dish success',
  GET_DISHES_BY_CATEGORY_SUCCESS: 'Get dishes by category success',
  GET_AVAILABLE_DISHES_SUCCESS: 'Get available dish success'
}

export const DISCOUNT_MESSAGE = {
  DISCOUNT_CODE_LENGTH: 'Discount code length must be from 2 to 20 characters',
  DISCOUNT_PERCENTAGE_VALIDATION: 'Discount percentage must be a number, and must be between 1 and 100',
  START_DATE_ISO8601: 'Start date must be a valid date in ISO 8601 format (YYYY-MM-DD)',
  START_DATE_GREATER: 'Start date must be greater than or equal to today',
  END_DATE_ISO8601: 'End date must be a valid date in ISO 8601 format (YYYY-MM-DD)',
  END_DATE_GREATER: 'End date must be greater than or equal to start date',
  DISCOUNT_NAME_EXIST: 'Discount code exists',
  CREATE_DISCOUNT_SUCCESS: 'Create discount success'
}
