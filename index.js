const express = require("express");
const connection = require("./connection/connection");
const productRouter = require("./product/routes/product.routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/products",productRouter);

app.get("/",(req,res)=>{

    res.status(200).send({message:"Welcome to Backend of Furniro assignment For uploading product (/products/add), for  fetching products (/products)"})
})
app.listen(8080,async()=>{
    try {
        await connection;
        console.log("server is connected to database");
        console.log("server is connet at port 8080");
    } catch (error) {
        console.log(error);
    }
});