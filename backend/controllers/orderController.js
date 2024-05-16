import orderModel from '../models/orderModel.js'
import userModel from '../models/userModels.js'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing order from frontend
const placeOrder = async (req, res) => {

   const url = 'https://food-delivery-backend-ehzw.onrender.com';

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        }) //creating new order
        await newOrder.save(); //saving order in database
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}}); //update and clean user cart data

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "GBP",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100*0.8
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "GBP",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2*100*0.8
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success: true, session_url: session.url})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
}
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == 'true') {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Payment Successful"})
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Order Cancelled"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}
//user orders for frontend
const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId, payment: true})
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

//list orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

//api to update order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}
export { placeOrder, verifyOrder, userOrder, listOrders, updateStatus };