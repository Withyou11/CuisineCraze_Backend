export const HTTP_STATUS = {
  // 2xx Success
  success: {
    OK: 200, // Request succeeded
    CREATED: 201, // Resource successfully created
    ACCEPTED: 202, // Request accepted but not yet processed
    NON_AUTHORITATIVE_INFORMATION: 203, // Non-authoritative information returned
    NO_CONTENT: 204 // Request succeeded, but no content to return
  },

  // 4xx Client Error
  clientError: {
    BAD_REQUEST: 400, // Invalid request syntax
    UNAUTHORIZED: 401, // Authentication required
    FORBIDDEN: 403, // Server understood request, but refusing to fulfill it
    NOT_FOUND: 404, // Requested resource not found
    METHOD_NOT_ALLOWED: 405, // HTTP method not allowed for resource
    NOT_ACCEPTABLE: 406, // Resource not acceptable according to headers
    PROXY_AUTHENTICATION_REQUIRED: 407, // Authentication required through proxy
    REQUEST_TIMEOUT: 408, // Client took too long to send request
    CONFLICT: 409, // Conflict with current resource state
    PRECONDITION_FAILED: 412, // Precondition given in headers failed
    PAYLOAD_TOO_LARGE: 413, // Payload size exceeds limits
    URI_TOO_LONG: 414, // URI too long for server to process
    UNPROCESSABLE_ENTITY: 422 // Request is well-formed, but contains semantic errors
  },
  serverError: {
    Internal_Server_Error: 500
  }
}
