import ordersModel from '../models/ordersModel.js'
import userModel from '../models/userModel.js';

// Placing orders using COD Method
const placeOrder = async (req,res) => {
    try {

        const { userId , items , amount , address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false, 
            date: Date.now()
        }

        const newOrder = new ordersModel(orderData);

        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}});

        res.json({success:true , message :"Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req,res) => {
    
}

// Placing orders using Stripe Method
const placeOrderRozarpay = async (req,res) => {

}

// All Orders data for Admin Panel
const allOrders = async (req,res) => {

}

// userOrder data for Frontend
const userOrders = async (req,res) => {
    try {
        const { userId } = req.body;

        const orders = await ordersModel.find({userId});

        res.json({success:true, orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

// Update Orders Status From Admin Panel
const updateStatus = async (req,res) => {
    
}

export {placeOrder ,placeOrderStripe ,placeOrderRozarpay ,allOrders ,userOrders ,updateStatus};