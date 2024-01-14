import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateLibraryDto } from '../library/dto/create-library.dto';
import { IBookRepository } from './port/out/book.repository.interface';
import { ILibraryRepository } from '../library/port/out/library.repository.interface';
import { ISentenceRepository } from '../sentence/port/out/sentence.repository.interface';
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
    @Inject('BookRepository') private readonly bookRepository: IBookRepository,
    @Inject('LibraryRepository')
    private readonly libraryRepository: ILibraryRepository,
    @Inject('SentenceRepository')
    private readonly sentenceRepository: ISentenceRepository,
  ) {
    this.bookSearchClient = new BookSearchClient(
      'https://dapi.kakao.com/v3/',
      'dbcdb83525e7ec414eb3bf2832f46097',
    );
  }

  async create(CreateBookDto: CreateBookDto, userId: string) {
    const createdBook = await this.bookRepository.create(CreateBookDto.to());

    const createLibraryDto = new CreateLibraryDto();
    createLibraryDto.userId = userId;
    createLibraryDto.bookId = createdBook.id;
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
    const my_book_id = await this.libraryRepository.findOne(userId, bookId);
    const sentence = await this.sentenceRepository.findMany(userId, my_book_id);
    const my_book = await this.bookRepository.findBook(my_book_id);
    my_book['sentences'] = [...sentence];

    my_book['sentences'] = my_book['sentences'].map((sentence) => {
      return {
        ...sentence,
        tags: sentence.tags.map((tag) => tag.name),
      };
    });

    return my_book;
  }

  async count(userId: string) {
    return await this.bookRepository.count(userId);
  }
}
