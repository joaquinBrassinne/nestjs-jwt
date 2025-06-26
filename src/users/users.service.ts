import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) { }


  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prismaService.user.create({ data: createUserDto });

    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Could not create user');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.user.findMany()
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Could not fetch users');
    }

  }

  async findOne(id: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { id: id }
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Could not fetch user');
    }

  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    return await this.prismaService.user.update({
      where: { id: id }, data: updateUserDto
    });
  }

  async remove(id: string) { 
    return await this.prismaService.user.delete({ where: { id: id } });
  }
}
