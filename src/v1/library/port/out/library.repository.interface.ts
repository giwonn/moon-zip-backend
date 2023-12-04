import { Library } from '../../entities/library.entity';

export interface ILibraryRepository {
  create(library: Library): Promise<Library>;
  getBookCount(userId: string): Promise<number>;
}
