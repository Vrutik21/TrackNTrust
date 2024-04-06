import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/error-handling';
import {
  OrdersDto,
  UpdateOrdersDto,
} from './dto/orders.dto';
import { GeofencingService } from 'src/geofencing/geofencing.service';

@Injectable()
export class PurchaseOrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geofencingSerive: GeofencingService,
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
            preference: true,
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
            preference: true,
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

      if (status === 'out_for_delivery') {
        await this.prisma.geofence_area.update({
          where: {
            customer_id: order.customer_id,
          },
          data: {
            is_active: true,
          },
        });

        if (!order.driver_id) {
          await this.prisma.purchase_order.update(
            {
              where: {
                id,
              },
              data: {
                driver_id:
                  'efadf31d-5556-49e5-afb8-29319f7a71cc',
              },
            },
          );
        }
      }

      if (status === 'failed_to_deliver') {
        const failedOrder =
          await this.prisma.purchase_order.update(
            {
              where: {
                id: order.id,
              },
              data: {
                delivery_attempts:
                  order.delivery_attempts + 1,
              },
            },
          );

        if (
          failedOrder.delivery_attempts === 2
          // && dto.status === 'reached_facility'
        ) {
          await this.geofencingSerive.sendSMSNotification(
            {
              phone: order.customer.mobile,
              message: `\nHello ${order.customer.name},\nwe hope you're well. We apologize for the inconvenience caused by our recent unsuccessful delivery attempts. \nTo ensure smooth delivery in the future, please update your preferences using the form linked here: \nhttps://e316-2605-8d80-6a0-a475-5838-1761-a59c-7083.ngrok-free.app/customer/preference/${order.id}.\n\nYour satisfaction is important to us. Thank you for your cooperation.\n\nBest regards,\nTrustNTrack`,
            },
          );
        }

        await this.prisma.geofence_area.update({
          where: {
            customer_id: order.customer_id,
          },
          data: {
            is_active: false,
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
