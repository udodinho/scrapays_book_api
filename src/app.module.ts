import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './authz/auth.module';
import { AuthorizationGuard } from './authz/authorization.guard';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: "schema.gql",
    installSubscriptionHandlers: true,
    subscriptions: {
      'graphql-ws': true,
    },
    path: '/graphql',
    playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'bookapi',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BookModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthorizationGuard],
})
export class AppModule {}
