import express from "express";
import cors from "cors";
import clientRoutes from "./routes/client.routes.js";
import orderRoutes from "./routes/order.routes.js";
import orderProductsRoutes from "./routes/orderProducts.routes.js";
import productRoutes from "./routes/product.routes.js";
import creditRoutes from "./routes/credit.routes.js";
import materialRoutes from "./routes/material.routes.js";
import promocodeRoutes from "./routes/promocode.routes.js";
import connectToDatabase from "./database/connectToMongoDB.js";
const app = express();
const port = 3001;

connectToDatabase();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use("/clients", clientRoutes);
app.use("/orders", orderRoutes);
app.use("/orderProducts", orderProductsRoutes);
app.use("/products", productRoutes);
app.use("/credits", creditRoutes);
app.use("/materials", materialRoutes);
app.use("/promocodes", promocodeRoutes);

app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
