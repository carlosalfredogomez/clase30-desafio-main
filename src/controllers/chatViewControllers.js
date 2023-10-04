const { ChatManager } = require("../dao/chatManagerDb");

const pagesFn = (io) => {
const manager = new ChatManager(io);

const chatLogin = async (req, res) => {
  try {
    return res.render("chat.handlebars")

  } catch (e) {
    console.log(e);
    return { "Error" : "Algo salio mal con la consulta"}
  }
}

const chatLoginPost = async (req, res) => {
    try { 
      const userEmail = req.body;
      console.log(userEmail.email)
      await manager.postUserLogin(userEmail)
      return res.redirect(`/chat.handlebars/messages?user=${userEmail.email}`) 

    } catch (e) {
      console.log(e);
      return { "Error" : "Algo salio mal con la consulta"}
    }
  }

const chat = async (req, res) => {
  try{
    return res.render("chat.messages.handlebars")
    
  } catch(e) {
    console.log(e);
    return { "Error" : "Algo salio mal con la consulta"}
  }
}

return {
    chatLogin,
    chatLoginPost,
    chat
  };
};

module.exports = pagesFn;