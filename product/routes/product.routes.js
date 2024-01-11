const express = require("express");
const { ProductModel } = require("../models/product.model");
const multer  = require("multer");


const productRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontent/src/image')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage });

  productRouter.get("/",async(req,res)=>{

    try {
        
        const product = await ProductModel.find(req.query);

        return res.status(200).send(product);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

productRouter.post("/add",upload.single("image"), async(req,res)=>{

    const {name,description,price,category} = req.body
    const {filename} = req.file;


    try {
        const newProduct = new ProductModel({
            name,
            description,
            price,
            category,
            image: filename
          });

        await newProduct.save();
        return res.status(201).send({message:"new product has been add in database","product":newProduct});
               
    } catch (error) {
        return res.status(400).send(error.message);
      }
});

productRouter.patch("/update/:id",async(req,res)=>{

const {id} = req.params;
  try {
    await ProductModel.findByIdAndUpdate({_id:id},req.body);
    return res.status(202).send({message:"product has been updated"});
  } catch (error) {
    return res.status(400).send(error.message);
    
  }
});

productRouter.delete("/delete/:id",async(req,res)=>{

  const {id} = req.params;
    try {
      await ProductModel.findByIdAndDelete({_id:id});
      return res.status(202).send({message:"product has been deleted"});
    } catch (error) {
      return res.status(400).send(error.message);
      
    }
  });

module.exports = productRouter;