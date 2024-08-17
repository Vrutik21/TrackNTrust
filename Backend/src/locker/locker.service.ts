// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { prismaError } from 'src/shared/error-handling';

// @Injectable()
// export class LockerService {
//   constructor(
//     private readonly prisma: PrismaService,
//   ) {}

//   async getLockers() {
//     try {
//       return await this.prisma.smart_locker.findMany(
//         {
//           include: {
//             associated_order: true,
//           },
//         },
//       );
//     } catch (err) {
//       prismaError(err);
//     }
//   }

//   async getLockerById(id: string) {
//     try {
//       return await this.prisma.smart_locker.findUnique(
//         {
//           where: {
//             id,
//           },
//           include: {
//             associated_order: true,
//           },
//         },
//       );
//     } catch (err) {
//       prismaError(err);
//     }
//   }
// }
