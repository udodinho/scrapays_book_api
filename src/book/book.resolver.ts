import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { UpdateBookDTO } from './dto/update-book.dto';
import { CreateBookDTO } from './dto/create-book.dto';
import { AuthorizationGuard } from 'src/authz/authorization.guard';
import { DeleteBookDTO } from './dto/delete-book.dto';

@Resolver(() => BookEntity)
export class BookResolver {
  constructor(
    @Inject(BookService) private bookService: BookService,
  ) {}

  // books returns all book
  @Query(() => [BookEntity], { nullable: true })
  async books(): Promise<BookEntity[]> {
    return await this.bookService.findAll();
  }

  // createBook creates a new book
  @UseGuards(AuthorizationGuard)
  @Mutation(() => BookEntity, { nullable: true })
  async createBook(
    @Args('createBookDTO') createBookDTO: CreateBookDTO,
  ): Promise<BookEntity> {
    return await this.bookService.create(createBookDTO)
  }

  // updateBook updates a single book
  @UseGuards(AuthorizationGuard)
  @Mutation(() => BookEntity, { nullable: true })
  async updateBook(
    @Args('updateBookDTO') updateBookDTO: UpdateBookDTO,
  ): Promise<BookEntity> {
    return await this.bookService.update(updateBookDTO)
  }

  // deleteBook deletes a single book
  @UseGuards(AuthorizationGuard)
  @Mutation(() => BookEntity, { nullable: true })
  async deleteBook(
    @Args('bookId') bookId: DeleteBookDTO,
  ): Promise<BookEntity> {
    return await this.bookService.delete(bookId)
  }
}
