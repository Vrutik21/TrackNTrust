import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { GeofencingService } from 'src/geofencing/geofencing.service';

@Module({
  providers: [
    PurchaseOrderService,
    GeofencingService,
  ],
})
export class PurchaseOrderModule {}
