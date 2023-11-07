import { Injectable } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { DeleteBookDTO } from './dto/delete-book.dto';

@Injectable()
export class BookService {
    constructor(@InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    ) {}

    async create(payload: CreateBookDTO): Promise<BookEntity> {
        return await this.bookRepository.save(payload);
    };

    async findAll(): Promise<BookEntity[]> {
        return await this.bookRepository.find();
    }

    async update(payload: UpdateBookDTO): Promise<BookEntity> {

        const updateBook = await this.bookRepository.findOne({
            where: { id: payload.id },
        });

        if (!updateBook || updateBook.id !== payload.id)
            throw new Error('Book does not exist.');

        updateBook.description = payload.description;

        updateBook.name = payload.name;

        return await this.bookRepository.save(payload);
    }

    async delete(payload: DeleteBookDTO): Promise<BookEntity> {
        const deleteBook = await this.bookRepository.findOne({
            where: { id: payload.id },
        });

        if (!deleteBook || deleteBook.id !== payload.id)
            throw new Error('Book does not exist.');

        return await this.bookRepository.remove(deleteBook);
    }
}
