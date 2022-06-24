import { PartialType } from '@nestjs/mapped-types';
import { ProductDto } from './Create.dto';

export class UpdateProductDto extends PartialType(ProductDto) {}
