import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateLibraryDto } from '../library/dto/create-library.dto';
import { CacheServerService } from '@/client/cache-server/cache-server.service';
import { Book } from '@/v1/book/entities/book.entity';
import { BookRepository } from '@/v1/book/book.repository';
import { LibraryRepository } from '@/v1/library/library.repository';
import { SentenceRepository } from '@/v1/sentence/sentence.repository';
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
      console.error(error);
      return 'Err';
    }
  }
}

@Injectable()
export class BookService {
  private readonly bookSearchClient: BookSearchClient;

  constructor(
    private readonly bookRepository: BookRepository,
    private readonly libraryRepository: LibraryRepository,
    private readonly sentenceRepository: SentenceRepository,
    private readonly redisCacheClient: CacheServerService,
  ) {
    this.bookSearchClient = new BookSearchClient(
      'https://dapi.kakao.com/v3/',
      'dbcdb83525e7ec414eb3bf2832f46097',
    );
  }

  async create(CreateBookDto: CreateBookDto, userId: string) {
    const createdBook = await this.bookRepository.create(CreateBookDto.to());

    const createLibraryDto = CreateLibraryDto.of(userId, createdBook.id);
    await this.libraryRepository.create(createLibraryDto.to());

    return createdBook;
  }

  async search(target: string, query: string) {
    return await this.bookSearchClient.searchBooks(target, query);
  }

  async findAll(userId: string) {
    return await this.bookRepository.findAll(userId);
  }

  async findOne(userId: string, bookId: string) {
    const isBookExist = await this.libraryRepository.findOne(userId, bookId);
    if (!isBookExist) {
      return null;
    }

    const [sentences, book] = await Promise.all([
      this.sentenceRepository.findMany(userId, bookId),
      this.bookRepository.findBook(bookId),
    ]);

    const sentencesWithTag = sentences.map((sentence) => ({
      ...sentence,
      tags: sentence.tags.map((tag) => tag.name),
    }));

    return {
      ...book,
      sentences: sentencesWithTag,
    };
  }

  async count(userId: string) {
    return await this.bookRepository.count(userId);
  }

  async getWeeklyTop50() {
    return await this.redisCacheClient
      .get('best-seller')
      .then<Book[]>((res) => (res ? JSON.parse(res) : []));
  }
}
