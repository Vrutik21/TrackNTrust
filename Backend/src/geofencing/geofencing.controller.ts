import {
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { GeofencingService } from './geofencing.service';
import {
  GeoFencingDto,
  SendSMSDto,
} from './dto/geofencing.dto';

@Controller('geofencing')
export class GeofencingController {
  constructor(
    private readonly geofenceService: GeofencingService,
  ) {}

  @Post(':id')
  checkWithinRadius(
    @Param('id') id: string,
    @Body() dto: GeoFencingDto,
  ) {
    return this.geofenceService.checkWithinRadius(
      id,
      dto,
    );
  }

  @Post('send')
  sendSMSNotification(@Body() dto: SendSMSDto) {
    return this.geofenceService.sendSMSNotification(
      dto,
    );
  }
}
