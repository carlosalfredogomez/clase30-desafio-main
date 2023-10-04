const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const ioFn = require("./utils/io.js");
const cookieParser = require("cookie-parser"); 
const MongoStore = require("connect-mongo");
const passport = require("passport");
const initializePassport = require("./config/passportConfig.js");
const flash = require("connect-flash");
const { Command } = require("commander");
const dotenv = require("dotenv");
const factoryFn = require("./dao/factory.js")
const configFn = require("./config.env/configFn");

const sessionRoutesFn = require("./routes/sessionRoutes.js");
const productsRoutesFn = require("./routes/productsRoutes.js");
const cartsRoutesFn = require("./routes/cartsRoutes.js");
const viewSessionRoutesFn = require("./routes/viewSessionRoutes.js");
const viewProductsRoutesFn = require("./routes/viewProductsRoutes.js");
const viewCartsRoutesFn = require("./routes/viewCartsRoutes.js");
const viewChatRoutesFn = require("./routes/viewChatRoutes.js");

const program = new Command();
program.option("--mode <mode>", "Modo de trabajo", "dev"); 
program.parse();
const options = program.opts();
dotenv.config({
  path: `.env.${options.mode}`,
});
console.log(`Sistema ejecutado en modo: ${options.mode}`);

const config = configFn();
factoryFn(config) 

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(flash());

const session = require("express-session");
app.use(cookieParser("estaEsMiLlaveSecreta"));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: CONNECTION_MONGO, 
      ttl: 120, 
    }),
    secret: "estaEsMiLlaveSecreta",
    resave: true, 
    saveUninitialized: true,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Servidor express corriendo en el puerto ${PORT}`)
); 

const io = ioFn(httpServer); 

const sessionRoutes = sessionRoutesFn(io);
const productsRoutes = productsRoutesFn(io);
const cartsRoutes = cartsRoutesFn(io);
const viewSessionRoutes = viewSessionRoutesFn(io);
const viewProductsRoutes = viewProductsRoutesFn(io);
const viewCartsRoutes = viewCartsRoutesFn(io);
const viewChatRoutes = viewChatRoutesFn(io);

app.use("/api/", sessionRoutes);
app.use("/api/", productsRoutes);
app.use("/api/", cartsRoutes);
app.use("/", viewSessionRoutes);
app.use("/", viewProductsRoutes);
app.use("/", viewCartsRoutes);
app.use("/", viewChatRoutes);

app.use((req, res) => {
  res.status(404).send({ Error: "La ruta deseada no existe" });
});
