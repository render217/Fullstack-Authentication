class PassportError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = PassportError;
