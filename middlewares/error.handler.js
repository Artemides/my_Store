function logError(err, req, res, next) {
  // console.log("LOG ERROR");
  // console.error(err);
  next(err);
}
function handleError(err, req, res, next) {
  // console.log("CLIENT ERROR");
  // console.log({
  //   mensaje: err.message,
  //   stack: err.stack
  // });
  res.status(500).json({
    "message": err.message
  });
}
function boomErrorHandler(err, req, res, next) {
  console.log(err)
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
    return;
  }
  next(err);
}
module.exports = {
  logError,
  handleError,
  boomErrorHandler
}
