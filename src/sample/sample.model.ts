import mongoose from 'mongoose';

export const SampleSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    description: String,
    color: String,
    region: String,
    details: {
      age: Number,
      height: Number,
    },
  },
  { timestamps: true },
);

export interface Sample {
  name: string;
  title: string;
  description: string;
  color: string;
  region: string;
  details: {
    age: number;
    height: number;
  };
}
