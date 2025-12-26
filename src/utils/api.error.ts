export class ApiError extends Error {
  public statusCode: number;
  public errors: any[];

  constructor(message: string, statusCode = 500, errors: any[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    // restore prototype chain (untuk dukungan instanceOf)
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
