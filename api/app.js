import express from "express";
import cors from "cors";
import clientRoutes from "./routes/client.routes.js";
import orderRoutes from "./routes/order.routes.js";
import orderProductsRoutes from "./routes/orderProducts.routes.js";
import productRoutes from "./routes/product.routes.js";
import creditRoutes from "./routes/credit.routes.js";
import materialRoutes from "./routes/material.routes.js";
import promocodeRoutes from "./routes/promocode.routes.js";
import giftcardRoutes from "./routes/giftcard.routes.js";
import statisticsRoutes from "./routes/statistic.routes.js";
import collectionRoutes from "./routes/collection.route.js";
import tagRoutes from "./routes/tag.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import authRoutes from "./routes/auth.routes.js";
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
app.use("/giftcards", giftcardRoutes);
app.use("/statistics", statisticsRoutes);
app.use("/collections", collectionRoutes);
app.use("/categories", categoryRoutes);
app.use("/auth", authRoutes);
app.use("/tags", tagRoutes);

app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
