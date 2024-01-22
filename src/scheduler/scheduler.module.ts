import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BestSellerModule } from '@/scheduler/best-seller/best-seller.module';

@Module({
  imports: [ScheduleModule.forRoot(), BestSellerModule],
})
export class SchedulerModule {}
