// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import "dotenv/config";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import mongoose from "mongoose";
// // app config
// const app = express();
// // const port =process.env.PORT || 4000;
// const port = 4000;
// //middlewares
// app.use(express.json());
// app.use(cors());


// mongoose.connect("mongodb://localhost:27017/Quick_Bites");

// // api endpoints
// app.use("/api/food", foodRouter);
// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// app.listen(port, () => {
//   console.log(`Server Started on port: ${port}`);
// });








import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();
const port = process.env.PORT || 4000; // Use environment variable for port or default to 4000

// Middlewares
app.use(express.json());
app.use(cors());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1/Quick_Bites");
  console.log("database connected");
}

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); // Serve static images
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Default route
app.get("/", (req, res) => {
  res.send("API is up and running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// server.listen(process.env.PORT, () => {
//   console.log("server started");
// });