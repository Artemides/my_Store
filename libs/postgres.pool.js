const {Pool}=require('pg')

const pool=new Pool({
  host: 'localhost',
  port: 5432,
  user: 'edmund',
  password: '192168101LL*',
  database: 'my_store',
});

module.exports=pool;
