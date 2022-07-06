const {faker}=require("@faker-js/faker");
const boom=require("@hapi/boom");
const {models}= require('../libs/sequelize');
class userService{
  constructor(){
    this.users=[];
    this.generateUsers();
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
      const result=models.User.findAll({
        include:['user_customer']
      });
      resolve(result);
    })
  }
  create(data){
    return new Promise(async (resolve,reject)=>{
        const result= await models.User.create(data).catch(err=>reject(err)); 
        resolve(result);
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
