const fs = require("fs");
const productsModel = require("../models/productModel");
const cartModel = require("../models/cartModel");

class CartManager {
  constructor(io, products) {
    this.io = io;
    this.products = products;
  }

  async getCarts() {
    try {
      const carts = await cartModel.find().populate("products.product");
      return carts;
    } catch (e) {
      console.log("Error al leer el archivo Carts");
      return {
        status: 500,
        respuesta: "Error desconocido al leer el archivo Carts",
      };
    }
  }

  async getCartsLimit(lim) {
    try {
      const cartsObj = cartModel.find().limit(lim);
      return cartsObj;
    } catch (e) {
      console.log("Error al leer el archivo Carts");
      return {
        status: 500,
        respuesta: "Error desconocido al leer el archivo Carts",
      };
    }
  }

  async getCartById(id) {
    try {
      if (!id) {
        console.log("Debe enviar un ID valido");
        return { status: 400, respuesta: "Debe enviar un ID valido" };
      }
      let cartId = await cartModel.findById(id).populate("products.product");;
      if (cartId)
        return {
          status: 200,
          respuesta: cartId,
        };
      return {
        status: 400,
        respuesta: `El carrrito con id: ${id} no existe`,
      };
    } catch (e) {
      console.log("Error desconocido");
      return {
        status: 500,
        respuesta: "Error desconocido",
      };
    }
  }

  async addCart(data) {
    try {
      const cart = await cartModel.findOne({ email: data.email });
      if (cart == null) {
        console.log("no existe el carrito, lo creo");
        const cart = await cartModel.create({ email: data.email });
      }

      const prod = data.products[0];
      const cartFound = await cartModel.findOne({ email: data.email }); 
    
      const productFoundInCart = cartFound.products.find(
        (p) => p.product == data.products[0].product
      );
      console.log(productFoundInCart);

      if (productFoundInCart != undefined) {
        productFoundInCart.quantity = productFoundInCart.quantity + data.products[0].quantity;
        await cartFound.save();
        this.io.emit(
          "addedProductToCart",
          JSON.stringify({ error: 200, data:`Ya existe el producto en el carrito ${data.email}, se le sumo la cantidad ${data.products[0].quantity}`})
        );
        console.log(`Ya existe el producto en el carrito ${data.email}, se le sumo la cantidad ${data.products[0].quantity}`)
        return {
          status: 200,
          respuesta: `Ya existe el producto en el carrito ${data.email}, se le sumo la cantidad ${data.products[0].quantity}`
        };
      }

      cartFound.products.push(prod);  
      await cartFound.save();

      const productList = await productsModel.findOne({ _id : data.products[0].product })
      this.io.emit(
        "addedProductToCart",
        JSON.stringify({ error: 400, data: `No existe el producto ${productList.title} en el carrito, sera agregado` })
      );
      console.log(`No existe el producto ${productList.title} en el carrito, sera agregado`)
        return {
          status: 200,
          respuesta: `No existe el producto ${productList.title} en el carrito, sera agregado`
        };
    } catch (e) {
      console.log(e);
      console.log("Error al agregar el carrito");
      return {
        status: 400,
        respuesta: "Erro desconocido al agregar el carrito",
      };
    }
  }

  async addCartPid(cid, pid, products) {
    try{

    } catch (e) {
      console.log("Error al agregar el carrito");
      return {
        status: 500,
        respuesta: "Erro desconocido al agregar el carrito",
      };
    }
  }

  async updateCart(cid,products) {
    try {
      console.log(cid)
      console.log(products)
      const cart = await cartModel.findOne({ _id: cid });
      console.log(cart)  
      if (cart == null) {
        console.log("no existe el carrito, lo creo");
        const cart = await cartModel.create({ email: data.email });
      }

      const prod = data.products[0]; 
      const cartFound = await cartModel.findOne({ email: data.email }); 
      
      const productFoundInCart = cartFound.products.find(
        (p) => p.product == data.products[0].product
      );
      console.log(productFoundInCart);

      if (productFoundInCart != undefined) {
        productFoundInCart.quantity = productFoundInCart.quantity + data.products[0].quantity;
        await cartFound.save();
        console.log(`Al producto ${data.products[0].product} del carrito ${data.email} se le sumo la cantidad ${data.products[0].quantity}`)
        return {
          status: 200,
          respuesta: `Al producto ${data.products[0].product} del carrito ${data.email} se le sumo la cantidad ${data.products[0].quantity}`
        };
      }

      cartFound.products.push(prod);
      await cartFound.save();
      console.log(`No existe el producto ${data.products[0].product} en el carrito, sera agregado`)
        return {
          status: 200,
          respuesta: `No existe el producto ${data.products[0].product} en el carrito, sera agregado`
        };
    } catch (e) {
      console.log(e);
      console.log("Error al agregar el carrito");
      return {
        status: 400,
        respuesta: "Erro desconocido al agregar el carrito",
      };
    }
  }

  async deleteCart(id) {
    try {
      if (!id) {
        console.log("Debe enviar un ID");
        return { status: 400, respuesta: "Debe enviar un ID valido" };
      }
      const deletedCart = await cartModel.deleteOne({ _id: id });
      if (deletedCart.deletedCount != 1) {
        console.log(`El carrito con id: ${id} no existe`);
        return {
          status: 400,
          respuesta: `El carrrito con id: ${id} no existe`,
        };
      }
      console.log(`El carrito con id: ${id} se elimino correctamente`);
      return {
        status: 200,
        respuesta: `El carrito con id: ${id} se elimino correctamente`,
      };
    } catch (e) {
      console.log("Erro desconocido al eliminar el carrito");
      return {
        status: 500,
        respuesta: "Error desconocido al eliminar el carrito",
      };
    }
  }
 
  async deleteCartProducts(cid) {
    try {
      if (!cid) {
        console.log("Debe enviar un ID");
        return { status: 400, respuesta: "Debe enviar un ID valido" };
      }
      const productsCart = await cartModel.findOne({ _id: cid });
      console.log(productsCart)

      if(productsCart.products == ""){
        console.log(`No hay productos para eliminar en el carrito ${productsCart.email}`);
      return {
        status: 200,
        respuesta: `No hay productos para eliminar en el carrito ${productsCart.email}`,
      };
      }
      productsCart.products = [];
      await productsCart.save() 
      console.log(`Se eliminaron todos los productos del carrito ${productsCart.email}`);
      return {
        status: 200,
        respuesta: `Se eliminaron todos los productos del carrito ${productsCart.email}`,
      };
    } catch (e) {
      console.log("Erro desconocido al eliminar el carrito");
      return {
        status: 500,
        respuesta: "Error desconocido al eliminar el carrito",
      };
    }
  }

  async deleteCartProduct(cid,pid) {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      console.log(cart)
      const productExist = cart.products.filter((p)=> p.product != pid)
      await cartModel.updateOne({ _id: cid},{ products: productExist})
      console.log(`Se elimino el producto ${pid} del carrito ${cart.email}`)
      return {
        status: 200,
        respuesta: `Se elimino el producto ${pid} del carrito ${cart.email}`,
      };
    } catch (e) {
      console.log("Erro desconocido al eliminar el carrito");
      return {
        status: 500,
        respuesta: "Error desconocido al eliminar el carrito",
      };
    }
  }
}

module.exports = {
  CartManager,
};
