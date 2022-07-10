const express = require('express');
const routerApp = require('./routes')
const cors=require('cors');
const { logError, handleError, boomErrorHandler,ormErrorHandler,ormDatabaseErrorHandler} = require('./middlewares/error.handler');


const app = express();
const port = process.env.PORT || 3000;
const whiteList=['http://127.0.0.1:3000','http://127.0.0.1:5500'];

const options={
   origin: (origin,cb)=>{
    if(whiteList.includes(origin) || !origin){
      cb(null,true);
    }else{
      cb(new Error('Domain not allowed'));
    }
   }
}

app.use(express.json());
app.use(cors(options));
require('./utils/auth');
routerApp(app);
app.use(logError);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(ormDatabaseErrorHandler);
app.use(handleError);
app.listen(port, () => {
  console.log(`Listenning on Port ${port}`)
})


