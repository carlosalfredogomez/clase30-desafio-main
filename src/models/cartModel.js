const { Schema, model } = require("mongoose") 
const cartSchema = new Schema ({
    email: String,
    products:{  
        type:[
            {
                product : {     
                    type: Schema.Types.ObjectId, 
                    ref: "products"              
                },
                quantity : Number
            }
        ],
        default : []  
    }
})


module.exports = model("carts" , cartSchema)  
