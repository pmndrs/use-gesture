class ValidationError extends Error {
  constructor(rule, value, cause, target, ...remaining) {
    super(remaining);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
    this.rule = rule;
    this.value = value;
    this.cause = cause;
    this.target = target;
  }
}

export default ValidationError;
