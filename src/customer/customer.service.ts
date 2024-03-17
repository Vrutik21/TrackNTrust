import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/error-handling';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAllCustomers() {
    try {
      return await this.prisma.customer.findMany({
        orderBy: {
          updated_at: 'desc',
        },
        include: {
          orders: true,
          geofence_areas: true,
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async getCustomerById(id: string) {
    try {
      return await this.prisma.customer.findUnique(
        {
          where: {
            id,
          },
          include: {
            orders: true,
            geofence_areas: true,
          },
        },
      );
    } catch (err) {
      prismaError(err);
    }
  }
}
