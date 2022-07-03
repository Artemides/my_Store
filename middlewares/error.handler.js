const {ValidationError, DatabaseError}=require('sequelize');
function logError(err, req, res, next) {
  console.log("LOG ERROR");
  console.error(err);
  next(err);
}
function handleError(err, req, res, next) {
  // console.log("CLIENT ERROR");
  // console.log({
  //   mensaje: err.message,
  //   stack: err.stack
  // });

  res.status(500).json({
    "message": err.message,
    err
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
function ormErrorHandler(err,req,res,next){
  console.log("IS ORM ERROR: ", err instanceof ValidationError)
  console.log("IS DB ERROR: ", err instanceof DatabaseError)
  if(err instanceof ValidationError){
    res.status(409).json({
      statusCode: 409,
      message:err.name,
      error: err.errors[0].message
    })
    return;
  }
  next(err);
}
function ormDatabaseErrorHandler(err,req,res,next){
  if(err instanceof DatabaseError){
    res.status(409).json({
      statusCode: 409,
      messsage: err.name,
      error: err
    })
    return;
  }
  next(err);
}
module.exports = {
  logError,
  handleError,
  boomErrorHandler,
  ormErrorHandler,
  ormDatabaseErrorHandler
}
