const cookieParser = require("cookie-parser") 

const cookieConf = (cookieParser('estaEsMiLlaveSecreta'))

module.exports = cookieConf;