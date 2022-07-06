const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op}=require('sequelize');
class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    for (let index = 0; index < 5; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }
  create(data) {
    return new Promise(async (resolve, reject) => {
      const response = await models.Product.create(data).catch(err=>reject(err));
      console.log('NEW PRODUCT');
      console.log(response);
      resolve(response);
    });
  }
  find(query) {
    return new Promise((resolve, reject) => {
      const { limit, offset,byPrice,min_price,max_price} = query;
      const options={
        include:['category'],
        where:{}
      }
      if(limit && offset){
        options.limit=limit;
        options.offset=offset;
      }
      if(byPrice){
        options.where.price=byPrice;
      }
      if(min_price && max_price){
        options.where.price={
            [Op.between]:[min_price,max_price]
        }
      }
      const response = models.Product.findAll(options);
      resolve(response);
    });
  }
  findOnde(id) {
    return new Promise(async (resolve, reject) => {
      const product = await models.Product.findByPk(id,{
        include:['category']
      });
      if (!product) {
        reject('Product not found');
      }
      resolve(product);
    });
  }
  async update(id, data) {
    const product = await this.findOnde(id);
    const response = await product.update(data);
    return response;
  }
  async patch(id, data) {
    const product = await this.findOnde(id);
    const response = await product.update(data);
    return response;
  }
  async delete(id) {
    const product = await models.Product.findByPk(id);
    console.log('PRODUCT');
    console.log(product);
    await product.destroy();
    return { id };
  }
}
module.exports = ProductService;
