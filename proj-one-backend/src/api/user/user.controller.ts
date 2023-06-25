import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('role-list')
  async getRoles(@Req() req: Request, @Res() res: Response) {
    return this.userService.getRoles(req, res)
  }

  @Post('user-list')
  async createUser(@Req() req: Request, @Res() res: Response, @Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(req, res, createUserDto);
  }

  @Get('user-list/:id?')
  async getUser(@Req() req: Request, @Res() res: Response) {
    return this.userService.getUser(req, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
