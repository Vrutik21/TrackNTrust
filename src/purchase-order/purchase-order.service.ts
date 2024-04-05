import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/error-handling';
import {
  OrdersDto,
  UpdateOrdersDto,
} from './dto/orders.dto';

@Injectable()
export class PurchaseOrderService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAllOrders() {
    try {
      return await this.prisma.purchase_order.findMany(
        {
          orderBy: [
            {
              updated_at: 'desc',
            },
          ],
          include: {
            order_entries: true,
            order_history: {
              orderBy: {
                created_at: 'desc',
              },
            },
            customer: true,
            driver_path: true,
          },
        },
      );
    } catch (err) {
      prismaError(err);
    }
  }

  async getOrderById(id: string) {
    try {
      return await this.prisma.purchase_order.findUnique(
        {
          where: {
            id,
          },
          include: {
            driver_path: true,
            order_entries: {
              include: {
                product: true,
              },
            },
            order_history: {
              orderBy: {
                created_at: 'desc',
              },
              include: {
                updated_by: true,
              },
            },
            customer: {
              include: {
                orders: true,
                geofence_areas: true,
              },
            },
          },
        },
      );
    } catch (err) {
      prismaError(err);
    }
  }

  async createOrder(dto: OrdersDto) {
    try {
      const {
        customer_id,
        user_id,
        loc_lat,
        loc_lon,
        order_entries,
      } = dto;

      let entries = [];
      let total_weight: number = 0;

      if (order_entries.length === 0) {
        throw new ForbiddenException(
          'Please add products in the order.',
        );
      }

      for (const {
        product_id,
        quantity,
      } of order_entries) {
        const result =
          await this.prisma.order_entries.create({
            data: {
              product_id,
              quantity,
            },
          });

        entries.push(result);

        const product =
          await this.prisma.product.findUnique({
            where: {
              id: product_id,
            },
          });

        total_weight += product.weight * quantity;
      }

      const order =
        await this.prisma.purchase_order.create({
          data: {
            customer_id,
            status: 'initiated',
            loc_lat,
            loc_lon,
            order_entries: {
              connect: entries.map(({ id }) => {
                return {
                  id,
                };
              }),
            },
            total_weight,
          },
        });

      const updatedOrder =
        await this.prisma.purchase_order.update({
          where: {
            id: order.id,
          },
          data: {
            order_history: {
              create: {
                status: 'initiated',
                description:
                  'Order was initiated at facility 1',
                loc_lat,
                loc_lon,
                updated_by: {
                  connect: {
                    id: user_id,
                  },
                },
              },
            },
          },
          include: {
            order_entries: true,
            order_history: true,
          },
        });

      return updatedOrder;
    } catch (err) {
      prismaError(err);
    }
  }

  async updateOrder(
    id: string,
    dto: UpdateOrdersDto,
  ) {
    try {
      const {
        status,
        loc_lat,
        loc_lon,
        description,
        user_id,
      } = dto;

      const order =
        await this.prisma.purchase_order.findUnique(
          {
            where: { id },
            include: {
              customer: true,
            },
          },
        );

      if (
        status === 'out_for_delivery' &&
        order.delivery_attempts === 2
      ) {
        throw new NotAcceptableException(
          'Cannot update as delivery attempts reached to maximum!',
        );
      }

      if (status === 'out_for_delivery') {
        await this.prisma.geofence_area.update({
          where: {
            customer_id: order.customer_id,
          },
          data: {
            is_active: true,
          },
        });
      }

      if (status === 'failed_to_deliver') {
        await this.prisma.purchase_order.update({
          where: {
            id: order.id,
          },
          data: {
            delivery_attempts:
              order.delivery_attempts + 1,
          },
        });
      }

      const updatedOrder =
        await this.prisma.purchase_order.update({
          where: {
            id,
          },
          data: {
            status,
            loc_lat,
            loc_lon,
            order_history: {
              create: {
                status,
                updated_by: {
                  connect: {
                    id: user_id,
                  },
                },
                description,
                loc_lat,
                loc_lon,
              },
            },
          },
          include: {
            order_entries: true,
            order_history: {
              orderBy: {
                created_at: 'desc',
              },
            },
          },
        });

      if (status === 'failed_to_deliver') {
        await this.prisma.geofence_area.update({
          where: {
            customer_id: order.customer_id,
          },
          data: {
            is_active: false,
          },
        });
      }

      return updatedOrder;
    } catch (err) {
      prismaError(err);
    }
  }

  async deleteOrder(id: string) {
    try {
      return await this.prisma.purchase_order.delete(
        {
          where: {
            id,
          },
          include: {
            order_entries: true,
            order_history: true,
          },
        },
      );
    } catch (err) {
      prismaError(err);
    }
  }
}
