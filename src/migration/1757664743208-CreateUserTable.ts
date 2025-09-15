/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1757664743208 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" ("name", "email") VALUES ('Admin', 'admin@example.com')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    `DELETE FROM "user" WHERE "email" = 'admin@example.com'`;
  }
}
