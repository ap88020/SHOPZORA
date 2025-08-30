import ordersModel from "../models/ordersModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

// Global Variales
const currency = 'inr';
const deliveryCharge = 10; 

// Gateway Initilize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new ordersModel(orderData);

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {

    const { userId, items, amount, address } = req.body;
    const {origin} = req.headers;

        const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new ordersModel(orderData);
    await newOrder.save();

    const line_items = items.map((item)=>({
      price_data:{
        currency:currency,
        product_data:{
          name:item.name
        },
        unit_amount: item.price * 100
      },
      quantity:item.quantity
    }))

    line_items.push({
            price_data:{
        currency:currency,
        product_data:{
          name:"Delivery charges"
        },
        unit_amount: deliveryCharge * 100
      },
      quantity:1
    })

    const session = await stripe.checkout.sessions.create({
        line_items: line_items, 
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      mode : 'payment'
    })

    res.json({success:true , session_url:session.url})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Verify Stripe
const verifyStripe = async (req,res) => {
  const {orderId , success , userId} = req.body;

  try {
    if(success == "true"){
      await ordersModel.findByIdAndUpdate(orderId , {payment:true});
      await userModel.findByIdAndUpdate(userId , {cartData:{}})

      res.json({success:true})
    }else{
      await ordersModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Placing orders using Stripe Method
const placeOrderRozarpay = async (req, res) => {};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await ordersModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// userOrder data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await ordersModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Orders Status From Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await ordersModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRozarpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
