import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateProductDto } from './dto/Update.dto';
import { ProductDto } from './dto/Create.dto';

@Injectable()
export class ProductService {
  // private products: Product[] = [];

  constructor(
    @InjectModel('Products') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(input: ProductDto) {
    const newProduct = new this.productModel({
      ...input,
    });

    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const result = await this.productModel.find(
      {},
      {
        Product_id: '$_id',
        Product_name: '$title',
        Product_description: '$description',
        Product_price: '$price',
      },
    );
    return result;
  }

  async getSingleProduct(prodId: string) {
    try {
      const product = await this.productModel.findById(prodId);
      return product;
    } catch (error) {
      throw new NotFoundException('Product dont exists');
    }
  }

  async updateProduct(prodId: string, input: UpdateProductDto) {
    const result = await this.productModel.findByIdAndUpdate(
      { _id: prodId },
      { ...input },
      { new: true },
    );
    console.log('result', result);
    return result;
  }

  async deleteProduct(prodId: string) {
    try {
      const result = await this.productModel.deleteOne({ _id: prodId });
      return result;
    } catch (error) {
      throw new NotFoundException('Product dont exists');
    }
  }

  // private async findProduct(id: string): Promise<Product> {
  //   try {
  //     const product = await this.productModel.findById(id, {
  //       Product_id: '$_id',
  //       Product_name: '$title',
  //       Product_description: '$description',
  //       Product_price: '$price',
  //     });
  //     return product;
  //   } catch (error) {
  //     throw new NotFoundException('Product dont exists');
  //   }
  // }
}
