export class ApiError extends Error {
  constructor(message: string, name: string = "ApiError") {
    super(message);
    this.name = name;
  }
}
