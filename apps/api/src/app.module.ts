import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from '../ormconfig';
import { ContentModule } from './content/content.module';
import { Content } from './entities/content.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSource.options,
      entities: [Content],
    }),
    ContentModule,
  ],
})
export class AppModule {}
