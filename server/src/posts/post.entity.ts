import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { CreatePostMetaOptionsDto } from '../meta-options/dtos/create-post-meta-options.dto';
import { postType } from './enums/postType.enum';
import { status } from './enums/status.enum';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    default: postType.POST,
    enum: postType,
    nullable: false,
  })
  postType: postType;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: status,
    default: status.DRAFT,
    nullable: false,
  })
  status: status;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  schema?: string;

  @Column({
    name: 'featured_image_url',
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  // work on these in relationship
  @Column({
    type: 'simple-array',
    nullable: true,
  })
  tags?: string[];

  @Column({
    name: 'meta_options',
    type: 'json',
    nullable: true,
  })
  metaOptions?: CreatePostMetaOptionsDto[];

  @Column({
    name: 'publish_on',
    type: 'timestamp with time zone',
    nullable: true,
  })
  publishOn?: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
