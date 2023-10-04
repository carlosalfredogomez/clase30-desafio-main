const ProductDTO = require("../dao/DTOs/productsDTO")

class ProductsRepository {
    constructor(dao){
        this.dao = dao;
    }
}

module.exports = ProductsRepository;