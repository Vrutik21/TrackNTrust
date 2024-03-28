import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/error-handling';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from './dto/customer.dto';

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

  async createCustomer(dto: CreateCustomerDto) {
    try {
      const {
        name,
        address,
        email,
        latitude,
        longitude,
        mobile,
        radius,
      } = dto;
      await this.prisma.customer.create({
        data: {
          name,
          address,
          email,
          mobile,
          geofence_areas: {
            create: {
              loc_lat: latitude,
              loc_lon: longitude,
              radius: Number(radius),
            },
          },
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async updateCustomer(
    id: string,
    dto: UpdateCustomerDto,
  ) {
    try {
      return await this.prisma.customer.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async deleteCustomer(id: string) {
    try {
      return await this.prisma.customer.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }
}
