import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { Sample } from './sample.model';

@Injectable()
export class SampleService {
  constructor(
    @InjectModel('sample') private readonly userModel: Model<Sample>,
  ) {}
  async create(createSampleDto: CreateSampleDto) {
    const sample = new this.userModel({
      ...createSampleDto,
    });
    await sample.save();
    return sample;
  }

  async findAll() {
    const result = await this.userModel.find();
    return { result };
  }

  async findOne(id: string) {
    try {
      const sample = await this.userModel.findById({ _id: id });
      return { sample };
    } catch (error) {
      throw new NotFoundException('not found');
    }
  }

  async update(id: string, updateSampleDto: UpdateSampleDto) {
    try {
      const sample = await this.userModel.findByIdAndUpdate(
        { _id: id },
        { ...updateSampleDto },
        { new: true },
      );

      return { sample };
    } catch (error) {
      throw new NotFoundException('erro occured');
    }
  }

  async remove(id: string) {
    try {
      const sample = await this.userModel.findByIdAndRemove({ _id: id });
      console.log(sample._id);

      if (sample?._id) throw new NotFoundException('id not found');
      return { sample };
    } catch (error) {
      throw new NotFoundException('erro occured');
    }
  }
}
