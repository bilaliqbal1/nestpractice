import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { JwtAuthGuard } from 'src/user/strategies/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post('/create')
  async create(@Body() createSampleDto: CreateSampleDto) {
    const result = await this.sampleService.create(createSampleDto);
    return { result };
  }

  @Get()
  async findAll() {
    const result = await this.sampleService.findAll();
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.sampleService.findOne(id);
    return result;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSampleDto: UpdateSampleDto,
  ) {
    const result = await this.sampleService.update(id, updateSampleDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.sampleService.remove(id);
    return result;
  }
}
