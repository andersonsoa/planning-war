import { Body, Controller, Get, Post } from '@nestjs/common';
import { HttpService } from './http.service';
import { CreateRoomDTO } from './dto/createRoom.dto';

@Controller('api')
export class HttpController {
  constructor(private httpService: HttpService) {}

  @Get('room')
  async listRoons() {
    return this.httpService.listRoons();
  }

  @Post('room')
  async createRoom(@Body() roomData: CreateRoomDTO) {
    return this.httpService.createRoom(roomData);
  }
}
