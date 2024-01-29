import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
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
app.use(bodyParser.json())
app.use(cors(corsOptions));
app.use("/client", clientRoutes);
app.use("/order", orderRoutes);
app.use("/productsbyorder", productsByOrderRoutes);
app.use("/product", productRoutes);
app.use("/credit", creditRoutes);

app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});