const { CartManager } = require("../dao/cartManagerDb");

const pagesFn = (io) => {

  const manager = new CartManager(io,);

  const carts = async (req, res) => {
    try {
      const data = await manager.getCarts();
      const carts = data.map((c) => c.toObject());
      console.log(carts)
      res.status(200).render("cartsDb.handlebars",{carts});
      
      return;
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const cartId = async (req, res) => {
    try {
      const pid = req.params.pid;
      const data = await manager.getCartById(pid);
      console.log(data)
      const cart = data.respuesta.toObject();
      res.render("cartsDb.handlebars",{cart});
      return
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const cartAdd = async (req, res) => {
    try {
      const data = req.body;
      console.log(req.body)
      const result = await manager.addCart(data);
      res.status(result.status).send(result.respuesta);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const cartAddPid = async (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const data = req.body;
      const result = await manager.addCartPid(cid, pid, data);
      res.status(result.status).send(result.respuesta);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const cartPut = async (req, res) => {
    try{
      const cid = req.params.cid;
      const products = req.body;
      const data = await manager.updateCart(cid,products);
    } catch(e) {
      console.log(e);
      return { "Error" : "Algo salio mal con la consulta"}
    }
  }

  const cartPutPid = async (req, res) => {
    try{
      const pid = req.params.pid;
      const cart = req.body;
      const data = await manager.updateCartPid(pid,cart);
      res.status(data.status).send(data.respuesta);
    } catch(e) {
      console.log(e);
      return { "Error" : "Algo salio mal con la consulta"}
    }
  }

  const cartProductsDelete = async (req, res) => {
    try {
      const cart = req.params.cid;
      const data = await manager.deleteCartProducts(cart);
      console.log(data)
      res.status(data.status).send(data.respuesta);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  const cartProductDelete = async (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const data = await manager.deleteCartProduct(cid,pid);
      res.status(data.status).send(data.respuesta);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  return {
    carts,
    cartId,
    cartAdd,
    cartAddPid,
    cartPut,
    cartPutPid,
    cartProductsDelete,
    cartProductDelete
  };
};

module.exports = pagesFn;
