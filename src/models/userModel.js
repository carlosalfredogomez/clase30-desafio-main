const { Schema, model } = require("mongoose") 

const userSchema = new Schema ({
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    username: String,
    age: Number,
    password: String,
    rol: {
        type: String,
        default: "user",
        enum: ["admin", "user"]
    }
      
})


module.exports = model("users" , userSchema)
