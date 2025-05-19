import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryFailedError } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { messages } from '../common/message';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { Email: email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { Password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = this.userRepository.create({ ...rest, Password: hashedPassword });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if ((error as any).code === '23505') {
        const detail = (error as any).detail as string;
        if (detail && detail.includes('Email')) {
          throw new BadRequestException(messages.emailAlreadyExists);
        } else if (detail && detail.includes('PhoneNo')) {
          throw new BadRequestException(messages.phoneAlreadyExists);
        }
      }
      throw new BadRequestException(messages.badRequest);
    }
  }

  async login(email: string, password: string): Promise<{ user: User; access_token: string }> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException(messages.userNotFound);
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      throw new NotFoundException(messages.invalidCredentials);
    }

    const payload = { sub: user.id, email: user.Email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      user,
      access_token,
    };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(messages.userNotFound);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(messages.userNotFound);
    }

    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(messages.userNotFound);
    }
    await this.userRepository.delete(id);
    return user;
  }
}
