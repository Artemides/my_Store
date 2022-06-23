const {faker} =require('@faker-js/faker')
const boom=require('@hapi/boom');
class ProductService{
    constructor(){
        this.products=[];
        this.generate();
    }
    generate(){
       for (let index = 0; index < 5; index++) {
        this.products.push({
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseInt(faker.commerce.price(),10),
          image: faker.image.imageUrl(),
          isBlocked: faker.datatype.boolean()
        })
       }
    }
    create(data){

     if(!data || !data.name || !data.description || !data.price){
       return {"error": "invalid data"};
     }
     const newProduct={
      id:faker.datatype.uuid(),
      name: data.name,
      description: data.description,
      price: data.price,
      image: faker.image.imageUrl(),
     }
     this.products.push(newProduct)
     return {"status":"created",...newProduct};

    }
    find(){
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          resolve(this.products)
        }, 500);
      })
    }
    findOnde(id){
      return new Promise((resolve,reject)=>{
        if(!id){
           reject("Invalid Product Id")
        }
        const product=this.products.find(p=>p.id===id);
        if(!product){
          reject("Product not found");
        }
        if(product.isBlocked){
          reject(boom.conflict('Product Blocked'))
        }
        resolve(product);
      })


    }
    update(id,data){
       if(!id){
        throw new Error('Invalid Product ID')
       }
       let index=this.products.findIndex(p=>p.id===id);
       if(index==-1){
        throw new Error('Product not found');
       }
       data.id=this.products[index].id;
       this.products[index]=data;
       return this.products[index];
    }
    patch(id,data){
      let index=this.products.findIndex(p=>p.id===id);
      if(index==-1){
        throw new Error('Product not found');
      }
      const product= this.products[index];
      this.products[index]={...product,...data};
      return this.products[index];
    }
    delete(id){
      let index=this.products.findIndex(p=>p.id===id);
      if(index==-1){
        throw boom.notFound('Product not found');
      }
      this.products.splice(index,1);
      return {"Deleted":id};
    }
}
module.exports=ProductService;
