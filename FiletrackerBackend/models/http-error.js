class HttpError extends Error {
  constructor(message, errorCode){
    super(message);//adding a mesage property to the instances created
    this.code = errorCode;
  }
}
module.exports = HttpError;