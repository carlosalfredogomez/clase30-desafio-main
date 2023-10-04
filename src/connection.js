const mongoose = require("mongoose");

const connectionFn = ((CONNECTION_MONGO)=>{


const db = mongoose.connection; 

mongoose.connect(CONNECTION_MONGO, { 
  useNewUrlParser: true,  
  useUnifiedTopology: true,
});

db.once("open", _ => {
  console.log("Sistema conectado a la base de datos MONGO"); 
});

db.on("error", (err) => {
  console.log("Error al conectar con la base");
  process.exit()  
});



})


module.exports = connectionFn;




