import express, { Application, json } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./logic";

import { UpdateExists, checkProductExists, idExists } from "./middlewares";

const app: Application = express();

app.use(json());

const port = 3000;

app.listen(port, () => {
  console.log("Server start on port 3000 🚀🚀🚀");
});

app.post("/products", checkProductExists, createProduct);

app.get("/products", getAllProducts);

app.get("/products/:id", idExists, getProductById);

app.patch("/products/:id", UpdateExists, idExists, updateProduct);

app.delete("/products/:id", idExists, deleteProduct);
