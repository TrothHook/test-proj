import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { User } from 'src/models/User.entity';
import { Role } from 'src/models/Role.entity';

@Injectable()
export class UserService {

  /**
   * 
   * @param req 
   * @param res 
   * @returns 
   */
  getRoles = async (req: Request, res: Response) => {
    try {
      const data = await Role.findAll();
      return res.status(200).send({
        success: 'OK',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: 'Fail',
        message: error.message,
      });
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param createUserDto
   * @returns
   */

  createUser = async (
    req: Request,
    res: Response,
    createUserDto: CreateUserDto,
  ) => {
    try {
      console.log(req.body);
      await User.create(req.body);
      return res.status(201).json({ success: 'ok', message: 'data inserted' });
    } catch (error) {
      return res
        .status(500)
        .json({ success: 'fail', message: 'Internal server error' });
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */

  async getUser(req: Request, res: Response) {
    try {
      return res.status(200).send(`This action returns all user`);
    } catch (error) {
      return `error`;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
