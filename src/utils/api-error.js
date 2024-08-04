class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack
  ) {
    super(message);
    this.message = message;
    this.data = null;
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    if (stack) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = stack;
    }
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      errors: this.errors,
      stack: this.stack,
    };
  }
}

export { ApiError };
