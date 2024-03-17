import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/error-handling';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAllProducts() {
    try {
      return await this.prisma.product.findMany({
        orderBy: {
          updated_at: 'desc',
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async getProductById(id: string) {
    try {
      return await this.prisma.product.findUnique(
        {
          where: {
            id,
          },
        },
      );
    } catch (err) {
      prismaError(err);
    }
  }
}
