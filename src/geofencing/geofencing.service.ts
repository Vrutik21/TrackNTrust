import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/error-handling';
import * as geolib from 'geolib';
import {
  GeoFencingDto,
  SendSMSDto,
} from './dto/geofencing.dto';
import { Twilio } from 'twilio';

@Injectable()
export class GeofencingService {
  private twilioClient: Twilio;

  constructor(
    private readonly prisma: PrismaService,
  ) {
    this.twilioClient = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async checkWithinRadius(
    id: string,
    dto: GeoFencingDto,
  ) {
    try {
      const { latitude, longitude } = dto;
      const customer =
        await this.prisma.customer.findUnique({
          where: {
            id,
          },
          include: {
            geofence_areas: true,
          },
        });

      // checks if 51.525/7.4575 is within a radius of 5 km from 51.5175/7.4678
      const isWithinRadius =
        geolib.isPointWithinRadius(
          { latitude, longitude },
          {
            latitude:
              customer.geofence_areas.loc_lat,
            longitude:
              customer.geofence_areas.loc_lon,
          },
          customer.geofence_areas.radius,
        );

      const distanceInMetres = geolib.getDistance(
        { latitude, longitude },
        {
          latitude:
            customer.geofence_areas.loc_lat,
          longitude:
            customer.geofence_areas.loc_lon,
        },
      );

      console.log(distanceInMetres);

      if (isWithinRadius) {
        if (distanceInMetres < 300) {
          return this.sendSMSNotification({
            phone: customer.mobile,
            message: `\nHello ${customer.name},\nBe ready to pick up your order anytime soon`,
          });
        }

        if (distanceInMetres < 500) {
          return this.sendSMSNotification({
            phone: customer.mobile,
            message: `\nHello ${customer.name},\nDelivery person is in your proximity radius and will be at your doorstep in around 5-10 minutes`,
          });
        }
      }

      if (
        !isWithinRadius &&
        distanceInMetres < 2000
      ) {
        return this.sendSMSNotification({
          phone: customer.mobile,
          message: `\nHello ${customer.name},\nDelivery person is near your area and will be at your doorstep soon`,
        });
      }

      return false;
    } catch (err) {
      prismaError(err);
    }
  }

  async sendSMSNotification(dto: SendSMSDto) {
    try {
      const { message, phone } = dto;
      await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });

      console.log(
        `SMS notification sent to ${phone}`,
      );

      return message;
    } catch (error) {
      console.error(
        `Error sending SMS notification to ${dto.phone}: ${error.message}`,
      );
    }
  }
}
