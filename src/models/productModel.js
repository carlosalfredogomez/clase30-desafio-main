const { Schema, model } = require("mongoose") 
const mongoosePaginate = require("mongoose-paginate-v2")
const productSchema = new Schema ({
    title: String,
    description: String,
    price: {
        type: Number,
        default: 0
    },
    thumbnail: String,
    code: {
        type: String,
        unique: true,
        index: true     
                        
    },
    stock: Number,
    category: {
        type: String,
        enum: ["fruta", "verdura"] 
      },
})

productSchema.plugin(mongoosePaginate) 

module.exports = model("products" , productSchema)  
