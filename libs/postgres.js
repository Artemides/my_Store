const {Client}=require('pg');

async function Connect(){
  const client=new Client({
    host: 'localhost',
    port: 5432,
    user: "edmund",
    password:"192168101LL*",
    database: "my_store",
  })
  await client.connect();
  return client;
}

module.exports=Connect;
