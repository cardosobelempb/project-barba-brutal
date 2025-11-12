// import { Prisma, Answer as AnswerMapper } from '@prisma/client';
// import { UUIDVO } from '@repo/core';
// import {AnswerEntity} from '@repo/question'

// export class AnswerPrismaMapper {
//   static toDomain(entity: AnswerMapper): AnswerEntity {
//     return AnswerEntity.create(
//       {
//         id: entity.id,
//         name: entity.name,
//         email: entity.email,
//         password: entity.password,
//         phone: entity.phone,
//         barber: entity.barber,
//         role: entity.role ?? [],
//         createdAt: entity.createdAt,
//         updatedAt: entity.updatedAt,
//         deletedAt: entity.deletedAt,
//       },
//       UUIDVO.create(entity.id),
//     );
//   }

//   static toPrisma(entity: AnswerEntity): Prisma.AnswerUncheckedCreateInput {
//     return {
//       id: entity.id.getValue(),
//       name: entity.name,
//       email: entity.email,
//       password: entity.password,
//       phone: entity.phone,
//       barber: entity.barber,
//       role: entity.role ?? 1,
//     };
//   }
// }
