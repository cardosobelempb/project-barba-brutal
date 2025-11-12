// import { Pagination } from '@repo/core';

// import { AnswerRepository, AnswerEntity } from '@repo/question';
// import { PrismaService } from 'src/shared/application/database/prisma.service';

// import { AnswerPrismaMapper } from './mapper/AnswerPrisma.mapper';

// export class AnswerPrismaRepository implements AnswerRepository {
//   constructor(private readonly prismaService: PrismaService) {}

//   async findByEmail(email: string): Promise<AnswerEntity | null> {
//     const entity = await this.prismaService.answer.findUnique({
//       where: { email },
//     });

//     if (!entity) return null;

//     return AnswerPrismaMapper.toDomain(entity);
//   }
//   async findById(id: string): Promise<AnswerEntity | null> {
//     const entity = await this.prismaService.answer.findUnique({
//       where: { id },
//     });

//     if (!entity) return null;

//     return AnswerPrismaMapper.toDomain(entity);
//   }
//   async findAll({ page }: Pagination): Promise<AnswerEntity[]> {
//     const Answers = await this.prismaService.answer.findMany();
//     return Answers.map((Answer) => AnswerPrismaMapper.toDomain(Answer));
//   }

//   async create(entity: AnswerEntity): Promise<void> {
//     await this.prismaService.answer.create({
//       data: AnswerPrismaMapper.toPrisma(entity),
//     });
//   }

//   async createResponse(entity: AnswerEntity): Promise<AnswerEntity> {
//     const Answer = await this.prismaService.answer.create({
//       data: AnswerPrismaMapper.toPrisma(entity),
//     });

//     return AnswerPrismaMapper.toDomain(Answer);
//   }

//   async update(entity: AnswerEntity): Promise<void> {
//     await this.prismaService.answer.update({
//       data: {
//         ...entity,
//         password: entity.password,
//         email: entity.email,
//       },
//       where: {
//         id: entity.id.getValue(),
//       },
//     });
//   }

//   async passwordUpdate(entity: AnswerEntity): Promise<void> {
//     await this.prismaService.answer.update({
//       data: { password: entity.password },
//       where: {
//         id: entity.id.getValue(),
//       },
//     });
//   }

//   async delete(entity: AnswerEntity): Promise<void> {
//     await this.prismaService.answer.delete({
//       where: { id: entity.id.getValue() },
//     });
//   }
// }

// export const Answer_PRISMA_REPOSITORY = AnswerPrismaRepository;

