import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/error-handling';
import { ProductDto } from './dto/product.dto';

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

  async upsertProduct(dto: ProductDto) {
    try {
      const {
        code,
        category,
        description,
        name,
        weight,
      } = dto;
      return await this.prisma.product.upsert({
        where: {
          code,
        },
        create: {
          category,
          description,
          name,
          weight,
          code,
        },
        update: {
          category,
          description,
          name,
          weight,
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async deleteProduct(id: string) {
    try {
      return await this.prisma.product.update({
        where: {
          id,
        },
        data: {},
      });
    } catch (err) {
      prismaError(err);
    }
  }
}
