import express from "express";
import cors from "cors";
import clientRoutes from "./routes/client.routes.js";
import orderRoutes from "./routes/order.routes.js";
import productsByOrderRoutes from "./routes/productsByOrder.routes.js";
import productRoutes from "./routes/product.routes.js";
import creditRoutes from "./routes/credit.routes.js";
import connectToDatabase from "./database/connectToMongoDB.js";
const app = express();
const port = 3001;

connectToDatabase()
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(express.json())
app.use(cors(corsOptions));
app.use("/clients", clientRoutes);
app.use("/orders", orderRoutes);
app.use("/productsbyorder", productsByOrderRoutes);
app.use("/products", productRoutes);
app.use("/credits", creditRoutes);

app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
}); 