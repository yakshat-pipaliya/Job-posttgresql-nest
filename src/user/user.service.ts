import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { messages } from '../common/message';
import { IUser } from './entities/user.interface'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findOne({ where: { Email: email } });
  }

  async create(createUserDto: CreateUserDto): Promise<{ message: string; user: IUser }> {
    const { Password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(Password, 10);
    const createUser = this.userRepository.create({ ...rest, Password: hashedPassword });
    try {
      const user = await this.userRepository.save(createUser);
      return { message: 'User Create Successfully', user };
    } catch (error) {
      if ((error as any).code === '23505') {
        const detail = (error as any).detail as string;
        if (detail.includes('Email')) {
          throw new BadRequestException(messages.emailAlreadyExists);
        } else if (detail.includes('PhoneNo')) {
          throw new BadRequestException(messages.phoneAlreadyExists);
        }
      }
      throw new BadRequestException(messages.badRequest);
    }
  }

  async login(email: string, password: string): Promise<{ user: IUser; access_token: string }> {
    const user = await this.findByEmail(email);
    if (!user) {
      this.logger.warn(`Login failed: user not found for email ${email}`);
      this.logger.error(`Login failed: user not found for email ${email}`);
      this.logger.debug(`Login failed: user not found for email ${email}`);
      this.logger.verbose(`Login failed: user not found for email ${email}`);
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

  async findAll(): Promise<{ message: string; user: IUser[] }> {
    const user = await this.userRepository.find();
    return { message: 'All User Found', user }
  }

  async findOne(id: number): Promise<{ message: string; user: IUser }> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(messages.userNotFound);
    }
    return { message: 'User found', user };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<{ message: string; user: IUser }> {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(messages.userNotFound);
    }
    return { message: 'User Updated Successfully', user };
  }

  async remove(id: number): Promise<{ message: string; user: IUser }> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(messages.userNotFound);
    }
    try {
      await this.userRepository.delete(id);
      return { message: 'User Delete Successfully', user };
    } catch (error) {
      if ((error as any).code === '23503') {
        throw new BadRequestException('User is using with other records, such as job applications.');
      }
      throw new BadRequestException(messages.badRequest);
    }
  }

}
