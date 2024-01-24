import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@/client/http/http.service';
import { ConfigService } from '@nestjs/config';
import { CreateBookDto } from '@/v1/book/dto/create-book.dto';
import { CacheServerService } from '@/client/cache-server/cache-server.service';
import { LoggerService } from '@/client/logger/logger.service';
import { BookRepository } from '@/v1/book/book.repository';

@Injectable()
export class BestSellerService implements OnModuleInit {
  constructor(
    private readonly loggerClient: LoggerService,
    private readonly httpClientService: HttpService,
    private readonly configService: ConfigService,
    private readonly cacheClient: CacheServerService,
    private readonly bookRepository: BookRepository,
  ) {}

  async onModuleInit() {
    await this.allTop50();
  }

  // 매일 오전 6시에 실행
  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async allTop50() {
    this.loggerClient.log('fetch best-seller start');

    const bestSellerIsbns = await this._getTopNByAladin(50);
    const kakaoBooks = await this._getKakaoBooks(bestSellerIsbns);

    const books = kakaoBooks
      .filter((item) => item)
      .map((kakaoBook) => {
        return CreateBookDto.fromKakaoBook(kakaoBook).to();
      });

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
      QueryType: 'BlogBest',
      MaxResults: n,
      SearchTarget: 'Book',
      output: 'js',
      Version: 20131101,
    };

    const response = await this.httpClientService
      .get(url)
      .queryParams(queryParams)
      .send();

    if (response.errorCode) {
      throw new InternalServerErrorException(response);
    }

    return response.item.map(
      (bestSeller: { [x: string]: any }) =>
        bestSeller['isbn13'] ?? bestSeller['isbn'],
    );
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
