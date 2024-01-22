import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpClientService } from '@/client/http/http-client.service';
import { ConfigService } from '@nestjs/config';
import { CreateBookDto } from '@/v1/book/dto/create-book.dto';
import { IBookRepository } from '@/v1/book/port/out/book.repository.interface';
import { RedisCacheClient } from '@/client/redis-cache/redis-cache.client';
import { LoggerClientService } from '@/client/logger/logger-client.service';

@Injectable()
export class BestSellerService implements OnModuleInit {
  constructor(
    private readonly loggerClient: LoggerClientService,
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService,
    private readonly cacheClient: RedisCacheClient,
    @Inject('BookRepository')
    private readonly bookRepository: IBookRepository,
  ) {}

  async onModuleInit() {
    if (this.configService.get('NODE_ENV') === 'development') return;

    await this.allTop50();
  }

  // 매주 일요일 자정에 실행
  @Cron(CronExpression.EVERY_WEEK)
  async allTop50() {
    this.loggerClient.log('start fetch best-seller', BestSellerService.name);

    const bestSellers = await this._getTopNByAladin(50);
    const isbns = bestSellers.map(
      (bestSeller) => bestSeller['isbn13'] ?? bestSeller['isbn'],
    );

    const kakaoBooks = await this._getKakaoBooks(isbns);

    const books = kakaoBooks.map((kakaoBook) =>
      CreateBookDto.fromKakaoBook(kakaoBook).to(),
    );

    for (const book of books) {
      await this.bookRepository.upsert(book);
    }

    await this.cacheClient.set('best-seller', JSON.stringify(books));

    this.loggerClient.log('fetch best-seller finished');
  }

  private async _getTopNByAladin(n: number) {
    const url = `http://www.aladin.co.kr/ttb/api/ItemList.aspx`;
    const queryParams = {
      TTBkey: this.configService.get('ALADIN_API_KEY'),
      QueryType: 'BestSeller',
      MaxResults: n,
      SearchTarget: 'Book',
      output: 'js',
      Version: 20131101,
    };

    return await this.httpClientService
      .get(url)
      .queryParams(queryParams)
      .send()
      .then((res) => res.item);
  }

  private async _getKakaoBooks(isbns: string[]) {
    const url = 'https://dapi.kakao.com/v3/search/book';
    const headers = {
      Authorization: `KakaoAK ${this.configService.get('KAKAO_API_KEY')}`,
    };
    const books: any[] = [];
    for (const isbn of isbns) {
      const book = await this.httpClientService
        .get(url)
        .headers(headers)
        .queryParams({
          query: isbn,
          target: 'isbn',
          size: 1,
        })
        .send()
        .then((res) => res.documents[0]);

      books.push(book);
    }

    return books;
  }
}
