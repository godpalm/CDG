import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email นี้ถูกใช้งานไปแล้ว');
    }
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'name', 'email', 'phone'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne ({ where:{ id }});
    if (!user) {
      throw new BadRequestException('ไม่พบผู้ใช้งานนี้');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    const updateUser = Object.assign(user, updateUserDto)

    return  await this.usersRepository.save(updateUser)

  }
  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new BadRequestException('ไม่พบผู้ใช้งานนี้');
    }
    await this.usersRepository.remove(user);
  }
}
