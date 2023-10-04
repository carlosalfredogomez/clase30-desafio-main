const { Server } = require("socket.io"); 

const { UserManagerDb } = require("../dao/userManagerDb");
const { ProductManagerDb } = require("../dao/productManagerDb");
const { ChatManager } = require("../dao/chatManagerDb");
const { CartManager } = require("../dao/cartManagerDb");

const ioFn = (httpServer) => {
  const io = new Server(httpServer);
  const userManager = new UserManagerDb(io);
  const productManager = new ProductManagerDb(io);
  const chatManager = new ChatManager(io);
  const cartManager = new CartManager(io);
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on("newProduct", async (data) => {
      productManager.addProduct(data);
    });

    socket.on("editProduct", async (data) => {
      const product = JSON.parse(data);
      productManager.updateProduct(product.id, product);
    });

    socket.on("deleteProduct", async (data) => {
      productManager.deleteProduct(data);
    });

    socket.on("getProductById", async (data) => {
      const id = JSON.parse(data);
      const res = await productManager.getProductById(id);
      socket.emit("getProductById", JSON.stringify(res));
    });

    socket.on("newUser", async (data) => {
      const newUser = JSON.parse(data);
      chatManager.postUserLogin(newUser);
      console.log(newUser);
      socket.broadcast.emit("joinUser", JSON.stringify(newUser));
      socket.emit("redirect", JSON.stringify(newUser));
    });

    socket.on("newMessage", async (data) => {
      const newMessage = JSON.parse(data);
      console.log(newMessage);
      chatManager.postUserLogin(newMessage);
    });

    socket.on("regiterUser", async (data) => { 
      const response = await userManager.createUser(data);
    });


  });

  return io;
};

module.exports = ioFn;
