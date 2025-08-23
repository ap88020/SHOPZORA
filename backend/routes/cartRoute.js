import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartControllers.js';
import autUser from '../middleware/authUser.js';

const cartRouter = express.Router();

cartRouter.post('/add',autUser,addToCart);
cartRouter.post('/update',autUser,updateCart);
cartRouter.post('/get',autUser,getUserCart);


export default cartRouter;