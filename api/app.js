import express from "express";
import cors from "cors";
import clientsRoutes from "./routes/clients.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import productsRoutes from "./routes/products.routes.js";
import productRoutes from "./routes/product.routes.js";
import creditsRoutes from "./routes/credits.routes.js";
const app = express();
const port = 3001;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
//admin
app.use("/clients", clientsRoutes);
app.use("/orders", ordersRoutes);
app.use("/products", productsRoutes);
app.use("/product", productRoutes);
app.use("/credits", creditsRoutes);

app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
