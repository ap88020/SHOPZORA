import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct = async (req,res) => {
    try {

        const { name, description, price , category, subCategory, sizes , bestseller } = req.body;

        const image1 = req.files.image1 && req.files?.image1?.[0] || null;
        const image2 = req.files.image2 && req.files?.image2?.[0] || null;
        const image3 = req.files.image3 && req.files?.image3?.[0] || null;
        const image4 = req.files.image4 && req.files?.image4?.[0] || null;

        const images = [image1,image2,image3,image4].filter((item) => item  != undefined);

        // console.log(images);

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
        )
        
        const productData = {
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestseller:bestseller == "true" ? true : false,
            sizes:JSON.parse(sizes),
            image:imageUrl,
            date:Date.now(),
        }

        // console.log(productData);
        const product = new productModel(productData);
        await product.save();


        res.status(200).json({success:true,message:"Product Added Successfully"});

    } catch (error) {
        console.log(error);
        res.status(400).json({success:false , message:error.message});
    }

}

// function for list Product 
const listProduct = async (req,res) => {
    try {
        const product = await productModel.find({});

        res.status(200).json({ success:true , product });
    } catch (error) {
        res.status(400).json({ success:false , message:error.message });
    }
}

// function for remove Product 
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success:true, message:"Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false , message:error.message });
    }
}

// function for single Product info
const singleProduct = async (req,res) => {
    try {

        const { productId } = req.body;
        const product = await productModel.findById(productId);
        // console.log(product);
        res.status(200).json({success:true , product});

    } catch (error) {

        res.status(400).json({success:false , message:error.message});
        
    }
}


export {addProduct , listProduct , removeProduct , singleProduct};