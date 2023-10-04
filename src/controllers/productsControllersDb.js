const { ProductManagerDb } = require("../dao/productManagerDb");

const pagesFn = (io) => {
  const manager = new ProductManagerDb(io);

  const products = async (req, res) => {   
    try {
      const query = req.query 
      const response = await manager.getProductsPaginate(query);
      res.status(200).json(response.data); 
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const productId = async (req, res) => {
    try {
      const pid = req.params.pid;
      const response = await manager.getProductById(pid);
      const product = response.data
      res.status(200).json(product);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };
  

  const productAdd = async (req, res) => {
    try {
      const product = req.body;
      const response = await manager.addProduct(product);
      res.status(200).json(response.data);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const productPut = async (req, res) => {
    try {
      const pid = req.params.pid;
      const product = req.body;
      const data = await manager.updateProduct(pid, product);
      res.status(data.status).send(data.respuesta);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const productDelete = async (req, res) => {
    try {
      const product = req.params.pid;
      const data = await manager.deleteProduct(product);
      res.status(data.status).send(data.respuesta);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  return {
    products,
    productId,
    productAdd,
    productDelete,
    productPut
  };
};

module.exports = pagesFn;
