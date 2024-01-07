import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { IBookRepository } from './port/out/book.repository.interface';

class BookSearchClient {
  private base_url: string;
  private api_key: string;

  constructor(base_url: string, api_key: string) {
    this.base_url = base_url;
    this.api_key = api_key;
  }

  async searchBooks(target: string, query: string): Promise<any> {
    const url = `${this.base_url}search/book`;
    const headers = {
      Authorization: `KakaoAK ${this.api_key}`,
    };
    const params = new URLSearchParams({
      target,
      query,
    });
    try {
      const response = await fetch(`${url}?${params.toString()}`, {
        headers,
      });
      if (response.status !== 200) {
        return 'Err';
      }
      const data = await response.json();

      return data['documents'];
      // return response.data['documents'];
    } catch (error) {
      console.log(error);
      // console.error(error);
      return 'Err';
    }
  }
}

@Injectable()
export class BookService {
  private readonly bookSearchClient: BookSearchClient;

  constructor(
    @Inject('BookRepository') private readonly bookRepository: IBookRepository,
  ) {
    this.bookSearchClient = new BookSearchClient(
      'https://dapi.kakao.com/v3/',
      'dbcdb83525e7ec414eb3bf2832f46097',
    );
  }

  async create(CreateBookDto: CreateBookDto, userId: string) {
    return await this.bookRepository.create(CreateBookDto.to(), userId);
  }

  async search(target: string, query: string) {
    return await this.bookSearchClient.searchBooks(target, query);
  }

  async findAll(userId: string) {
    return await this.bookRepository.findAll(userId);
  }

  async findOne(userId: string, bookId: string) {
    const myBookId = await this.bookRepository.findOne(userId, bookId);
    return await this.bookRepository.findBook(myBookId);
  }
}
