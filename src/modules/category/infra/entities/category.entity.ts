import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICategory } from '../../domain/interfaces/category.interface';
import { UniqueEntityID } from '../../../../shared/utils/unique-entity-id.utils';

@Schema({ timestamps: true })
export class CategoryEntity extends Document implements Omit<ICategory, 'id'> {
  @Prop({ required: true })
  userId: UniqueEntityID;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  createdAt?: Date;

  @Prop({ required: true })
  updatedAt?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);
