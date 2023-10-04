const bcrypt = require("bcrypt")

const hashPassword = ((password)=>{  
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) 
})

const isValidPassword = ((password,passwordHashed)=>{
    return bcrypt.compareSync(password,passwordHashed)  
})

module.exports = {
    hashPassword,
    isValidPassword
}