import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRozarpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
} from "../controllers/ordersControllers.js";

import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js'


const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

// Payment Features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRozarpay);

// User Features
orderRouter.post('/userorders',authUser,userOrders);


// verifyStripe
orderRouter.post('/verifyStripe',authUser,verifyStripe)
export default orderRouter
