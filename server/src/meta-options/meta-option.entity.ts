import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class MetaOptions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'meta_value',
    type: 'json',
    nullable: false,
  })
  metaValue: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
