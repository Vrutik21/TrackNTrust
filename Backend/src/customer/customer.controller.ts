import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
  DeliveryPreferenceDto,
  UpdateCustomerDto,
} from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  @Get(':id')
  getCustomerById(@Param('id') id: string) {
    return this.customerService.getCustomerById(
      id,
    );
  }

  @Patch(':id')
  updateCustomer(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(
      id,
      dto,
    );
  }

  @Delete('id')
  deleteCustomer(@Param('id') id: string) {
    return this.customerService.deleteCustomer(
      id,
    );
  }

  @Post('set-preference/:id')
  upsertDeliveryPreference(
    @Param('id') order_id: string,
    @Body() dto: DeliveryPreferenceDto,
  ) {
    return this.customerService.upsertDeliveryPreference(
      order_id,
      dto,
    );
  }
}
