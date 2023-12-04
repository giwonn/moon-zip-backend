import { Library } from '../../entities/library.entity';
import { CreateLibraryDto } from '../../dto/create-library.dto';

export interface ILibraryService {
  create(createLibraryDto: CreateLibraryDto): Promise<Library>;
  getBookCount(userId: string): Promise<number>;
}
