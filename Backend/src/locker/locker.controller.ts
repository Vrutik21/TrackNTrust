// import {
//   Controller,
//   Get,
//   Param,
// } from '@nestjs/common';
// import { LockerService } from './locker.service';

// @Controller('locker')
// export class LockerController {
//   constructor(
//     private readonly lockerService: LockerService,
//   ) {}

//   @Get()
//   getLockers() {
//     return this.lockerService.getLockers();
//   }

//   @Get(':id')
//   getLockerById(@Param('id') id: string) {
//     return this.lockerService.getLockerById(id);
//   }
// }
