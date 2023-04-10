import { Request, Response } from "express";
import { market } from "./database";
import { IProduct, IRequest } from "./interfaces";

export function createProduct(req: IRequest, res: Response): Response {
  const products = req.body;

  const today = new Date();
  const expirationDate = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000);

  const newProducts = products.map((product, index) => {
    return {
      id: market.length + index + 1,
      name: product.name,
      price: product.price,
      weight: product.weight,
      section: product.section,
      expirationDate,
      calories: product.section === "food" ? product.calories : undefined,
    };
  });

  market.push(...newProducts);

  return res.status(201).json(newProducts);
}

export function getAllProducts(req: Request, res: Response): Response {
  return res.status(200).json(market);
}

export function getProductById(req: Request, res: Response): Response {
  const productId = Number(req.params.id);
  const product = market.find((product) => product.id === productId);

  return res.status(200).json(product);
}

export function updateProduct(req: Request, res: Response): Response {
  const productId = Number(req.params.id);
  const { name, price, weight, calories, section } = req.body;

  const productIndex = market.findIndex((product) => product.id === productId);

  const product = market[productIndex];

  const updatedProduct = {
    id: product.id,
    name: name ?? product.name,
    price: price ?? product.price,
    weight: weight ?? product.weight,
    section: section ?? product.section,
    expirationDate: product.expirationDate,
    calories: section === "food" ? Number(calories) : undefined,
  };

  market.splice(productIndex, 1, updatedProduct);

  return res.json(updatedProduct);
}

export function deleteProduct(req: Request, res: Response): Response {
  const productId = Number(req.params.id);

  const productIndex = market.findIndex((p) => p.id === productId);

  market.splice(productIndex, 1);

  return res.status(204).send();
}
