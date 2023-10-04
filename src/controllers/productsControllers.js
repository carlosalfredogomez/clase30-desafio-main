const { ProductManager } = require("../dao/productManager");

const manager = new ProductManager("db/products.json");

const products = async (req, res) => {
  try {
    const limitInt = parseInt(req.query.limit);
    const data = await manager.getProducts();
    if (!limitInt) res.json(data);
    else {
      const dataLimit = data.slice(0, limitInt);
      res.json(dataLimit);
    }
  } catch (e) {
    console.log(e);
    return { "Error" : "Algo salio mal con la consulta"}
  }
}

const productId = async (req, res) => {
  try{
    const pid = parseInt(req.params.pid);
    const data = await manager.getProductById(pid);
    res.status(data.status).json(data.respuesta);
  } catch(e) {
    console.log(e);
    return { "Error" : "Algo salio mal con la consulta"}
  }
}

const productAdd = async (req, res) => {
  try{
    const product = req.body;
    const data = await manager.addProduct(product);
    res.status(data.status).send(data.respuesta);
  } catch(e) {
    console.log(e);
    return { "Error" : "Algo salio mal con la consulta"}
  }
}

const productPut = async (req, res) => {
  try{
    const pid = req.params.pid;
    const product = req.body;
    const data = await manager.updateProduct(pid,product);
    res.status(data.status).send(data.respuesta);
  } catch(e) {
    console.log(e);
    return { "Error" : "Algo salio mal con la consulta"}
  }
}

const productDelete = async (req, res) => {
  try{
    const product = req.params.pid;
    const data = await manager.deleteProduct(product);
    res.status(data.status).send(data.respuesta);
  } catch(e) {
    console.log(e);
    return { "Error" : "Algo salio mal con la consulta"}
  }
}

module.exports = { products, productId, productAdd, productDelete, productPut }