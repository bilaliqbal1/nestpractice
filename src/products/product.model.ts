import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
  },
  { timestamps: true },
);

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}
