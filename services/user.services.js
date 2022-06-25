const {faker}=require("@faker-js/faker");
const boom=require("@hapi/boom");

const pool=require('../libs/postgres.pool');




class userService{
  constructor(){
    this.users=[];
    this.generateUsers();
    this.pool=pool.on('error',(err)=> console.error(err));
  }
  generateUsers(){
    for (let index = 0; index < 10; index++) {
      const name= faker.name.firstName();
      const email=faker.internet.email(name);
      this.users.push({
          id: faker.datatype.uuid(),
          dni: faker.random.numeric(8),
          name,
          lastName: faker.name.lastName(),
          born: faker.date.birthdate({min:1900,max:2022,mode:'year'}),
          email
      })
    }
  }
  find(){
    return new Promise( async (resolve,reject)=>{
      const query= 'SELECT * FROM tasks';
      const result=await this.pool.query(query);
      resolve(result.rows);
    })
  }
  create(data){
    return new Promise((resolve,reject)=>{
      data.id=faker.datatype.uuid();
      this.users.push({
        ...data
      });
      resolve(data);
    })
  }
  patch(id,data){
    return new Promise((resolve,reject)=>{
      const index=this.users.findIndex(u=>u.id===id);
      if(index===-1){
        reject(boom.notFound('User not Found'));
      }
      const user=this.users[index];
      this.users[index]={...user,...data};
      resolve(this.users[index]);
    })
  }
}

module.exports=userService;
