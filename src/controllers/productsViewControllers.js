const { ProductManagerDb } = require("../dao/productManagerDb");

const pagesFn = (io) => {
  const manager = new ProductManagerDb(io);

  const home = async (req, res) => {
    try {
      const limitInt = parseInt(req.query.limit);
      const data = await manager.getProducts();
      if (!limitInt) {
        res.render("home.handlebars", { data });
      } else {
        const dataLimit = data.slice(0, limitInt);
        res.render("home.handlebars", dataLimit);
      }
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const homeById = async (req, res) => {
    try {
      const pid = parseInt(req.params.pid);
      const data = await manager.getProductById(pid);
      res.render("home.handlebars", { data });
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const createProducts = async (req, res) => { 
    try {
      await manager.createProducts();
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  
  const realTimeProducts = async (req, res) => {
    try {
      const userSession = req.user.name;
      const query = req.query;
      const response = await manager.getProductsPaginate(query);
      const data = response.data 
      res.render("realTimeProductsDb.handlebars", {data , userSession});
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };
  const realTimeProductById = async (req, res) => {
    try {
      const pid = req.params.pid;
      const data = await manager.getProductById(pid);                                                                                                          
      const product = data.respuesta
      res.json(product);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const postRealTimeProducts = async (req, res) => {
    try {
      const product = req.body;
      const data = await manager.addProduct(product);
      res.json(data);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const deleteRealTimeProducts = async (req, res) => {
    try {
      const pid = req.params.pid;
      const data = await manager.deleteProduct(pid);
      res.json(data);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };
  
  const updateRealTimeProducts = async (req, res) => {
    try{
      const pid = req.params.pid;
      const product = req.body;
      const data = await manager.updateProduct(pid,product);
    } catch(e) {
      console.log(e);
      return { "Error" : "Algo salio mal con la consulta"}
    }
  }

  return {
    home,
    homeById,
    createProducts,
    realTimeProducts,
    realTimeProductById,
    postRealTimeProducts,
    updateRealTimeProducts,
    deleteRealTimeProducts
  };
};

module.exports = pagesFn;
