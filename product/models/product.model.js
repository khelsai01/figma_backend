const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:String,
    image:String,
    price:Number,
    category:String,
    description:String
},{
    versionKey:false
});

const ProductModel = mongoose.model("product",productSchema);


module.exports ={ProductModel};