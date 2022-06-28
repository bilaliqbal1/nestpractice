import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SampleSchema } from './sample.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'sample', schema: SampleSchema }]),
  ],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
