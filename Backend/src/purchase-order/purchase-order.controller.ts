import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import {
  OrdersDto,
  UpdateOrdersDto,
} from './dto/orders.dto';

@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(
    private readonly purchaseOrderService: PurchaseOrderService,
  ) {}

  @Get()
  getAllOrders() {
    return this.purchaseOrderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.purchaseOrderService.getOrderById(
      id,
    );
  }

  @Post()
  createOrder(@Body() dto: OrdersDto) {
    return this.purchaseOrderService.createOrder(
      dto,
    );
  }

  @Patch(':id')
  updateOrder(
    @Param('id') id: string,
    @Body() dto: UpdateOrdersDto,
  ) {
    return this.purchaseOrderService.updateOrder(
      id,
      dto,
    );
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.purchaseOrderService.deleteOrder(
      id,
    );
  }
}
