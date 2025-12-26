export class ApiError extends Error {
    statusCode;
    errors;
    constructor(message, statusCode = 500, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        // restore prototype chain (untuk dukungan instanceOf)
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
//# sourceMappingURL=api.error.js.map