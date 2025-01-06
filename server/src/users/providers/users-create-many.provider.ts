import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Inject Datasource
     * */
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Creates multiple users within a transactional context.
   *
   * This method ensures that all user creation operations are executed atomically.
   * If any operation fails, the transaction is rolled back to maintain database consistency.
   *
   * ### Steps for Transaction Handling:
   * 1. **Create a QueryRunner instance**: This instance manages the database queries and transaction.
   * 2. **Connect QueryRunner to the database**: Establish a connection for executing queries.
   * 3. **Start Transaction**: Begin the transaction to ensure atomic operations.
   * 4. **Execute User Creation**: Create users as per the provided data.
   * 5. **Commit Transaction**: Commit changes to the database if all operations are successful.
   * 6. **Rollback Transaction**: Revert changes in case of any errors.
   * 7. **Release Connection**: Release the database connection to avoid resource leaks.
   *
   * @async
   * @param {CreateUserDto} createUsersDto - Data Transfer Object containing the details of the users to be created.
   * @throws {Error} Throws an error if the transaction fails at any step.
   */
  public async createMany(createUsersDto: CreateUserDto[]) {
    const newUsers: User[] = [];

    // create queryRunner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect queryRunner to datasource
      await queryRunner.connect();

      // Start Transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment please try later', {
        description: 'Erorr connecting to database.',
      });
    }

    try {
      // Execute user creation
      for (const user of createUsersDto) {
        let newUser = queryRunner.manager.create(User, user);
        newUser = await queryRunner.manager.save(newUser);
        newUsers.push(newUser);
      }

      // If success then commit
      await queryRunner.commitTransaction();
    } catch (error) {
      // Rollback Transaction
      await queryRunner.rollbackTransaction();

      throw new ConflictException('Unable to create user, please try again.', {
        description: String(error),
      });
    } finally {
      try {
        // Release Connection
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Unable to process at the moment please try later', {
          description: 'Error connecting to database.',
        });
      }
    }
    return newUsers;
  }
}
