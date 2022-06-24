import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductDto } from './dto/Create.dto';
import { UpdateProductDto } from './dto/Update.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async addProduct(@Body() input: ProductDto) {
    const generatedId = await this.productService.insertProduct(input);

    return { id: generatedId };
  }

  @Get()
  async getPoduct() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getSingleProduct(@Param('id') prodId: string) {
    return await this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body() input: UpdateProductDto,
  ) {
    const result = await this.productService.updateProduct(prodId, input);
    return result;
  }

  @Delete(':id')
  async deleteUpdate(@Param('id') prodId: string) {
    const result = await this.productService.deleteProduct(prodId);
    return result;
  }
}
