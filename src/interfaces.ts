import { Request } from "express";
export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: string;
  expirationDate: Date;
  calories?: number | undefined;
}

export interface IRequest extends Request {
  body: IProduct[];
}
