import { Request, Response, NextFunction } from "express";
import { market } from "./database";
import { IRequest } from "./interfaces";

export function checkProductExists(
  req: IRequest,
  res: Response,
  next: NextFunction
): Response | void {
  const products = req.body;

  products.forEach((product) => {
    const { name, price, weight, section } = product;

    if (!name || !price || !weight || !section) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    const productExists = market.some((product) => product.name === name);
    if (productExists) {
      return res.status(400).json({ error: "Product already registered" });
    }
  });

  next();
}

export function idExists(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const productId = Number(req.params.id);
  const product = market.find((product) => product.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  next();
}

export function UpdateExists(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const productId = Number(req.params.id);
  const { name } = req.body;

  const productExists = market.some(
    (product) => product.name === name && product.id !== productId
  );
  if (productExists) {
    return res
      .status(400)
      .json({ error: "Product with this name already registered" });
  }

  next();
}
