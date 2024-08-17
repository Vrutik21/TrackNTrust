import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/error-handling';
import {
  CreateCustomerDto,
  DeliveryPreferenceDto,
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
            orders: {
              include: {
                customer: {
                  include: {
                    geofence_areas: true,
                  },
                },
                order_entries: true,
                order_history: true,
              },
            },
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

  async upsertDeliveryPreference(
    order_id: string,
    dto: DeliveryPreferenceDto,
  ) {
    try {
      const order =
        await this.prisma.purchase_order.findUnique(
          {
            where: {
              id: order_id,
            },
          },
        );

      const delivery_date = new Date(
        dto.delivery_date,
      );

      if (order.delivery_attempts < 2) {
        throw new ForbiddenException(
          'Cannot set preference as delivery attempts have not reached!',
        );
      }

      const preference =
        await this.prisma.delivery_preference.upsert(
          {
            where: {
              customer_id: order.customer_id,
              order_id,
            },
            update: {
              delivery_date,
              delivery_time: dto.delivery_time,
              order_id,
              customer_id: order.customer_id,
            },
            create: {
              delivery_date,
              delivery_time: dto.delivery_time,
              order_id,
              customer_id: order.customer_id,
            },
          },
        );

      if (preference) {
        await this.prisma.purchase_order.update({
          where: {
            id: order_id,
          },
          data: {
            isDeliveryPreference: true,
          },
        });
      }

      return preference;
    } catch (err) {
      prismaError(err);
    }
  }

  async deleteDeliveryPreference(id: string) {
    try {
      return await this.prisma.delivery_preference.delete(
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
