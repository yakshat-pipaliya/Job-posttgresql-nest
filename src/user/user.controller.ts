import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseFilters, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IUser } from './entities/user.interface'
import { LoginInterceptor } from '../common/login.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body(new ValidationPipe({ transform: true, whitelist: true })) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @UseInterceptors(LoginInterceptor)
  login(@Body(new ValidationPipe({ transform: true, whitelist: true })) loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto.Email, loginUserDto.Password);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true })) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
