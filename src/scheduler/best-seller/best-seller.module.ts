import { Module } from '@nestjs/common';
import { BestSellerService } from '@/scheduler/best-seller/best-seller.service';
import { BookModule } from '@/v1/book/book.module';

@Module({
  imports: [BookModule],
  providers: [BestSellerService],
})
export class BestSellerModule {}
