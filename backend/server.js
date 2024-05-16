import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//app-config
const app = express()
const port = 10000

//middleware
app.use(express.json())
app.use(cors({
    origin: 'https://food-delivery-frontend-qiwm.onrender.com'
  }));

//DB connection
connectDB();

//api endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API working")
}) //HTTP method to request data from server

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://Equilfy:AoGswXIDQaYRquIB@cluster0.5mf89am.mongodb.net/?