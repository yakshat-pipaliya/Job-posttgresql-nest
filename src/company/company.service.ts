import { Injectable, NotFoundException, BadRequestException, Logger, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { messages } from '../common/message';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);

  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<{ message: string; company: Company }> {
    const company = this.companyRepository.create(createCompanyDto);
    try {
      const savedCompany = await this.companyRepository.save(company);
      return { message: messages.companyCreated, company: savedCompany };
    } catch (error) {
      if ((error as any).code === '23505') {
        const detail = (error as any).detail as string;
        if (detail.includes('Email')) {
          throw new BadRequestException(messages.emailAlreadyExists);
        } else if (detail.includes('ContactNo')) {
          throw new BadRequestException(messages.phoneAlreadyExists);
        }
      }
      throw new BadRequestException(messages.badRequest);
    }
  }

  async findAll(): Promise<{ message: string; companies: Company[] }> {
    const companies = await this.companyRepository.find();
    return { message: messages.companyListReturned, companies };
  }

  async findOne(id: number): Promise<{ message: string; company: Company }> {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(messages.companyNotFound.replace('{id}', id.toString()));
    }
    return { message: messages.companyFound, company };
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<{ message: string; company: Company }> {
    const company = await this.companyRepository.preload({
      id,
      ...updateCompanyDto,
    });
    if (!company) {
      throw new NotFoundException(messages.companyNotFoundUpdate.replace('{id}', id.toString()));
    }
    try {
      const updatedCompany = await this.companyRepository.save(company);
      return { message: messages.companyUpdated, company: updatedCompany };
    } catch (error) {
      if ((error as any).code === '23505') {
        const detail = (error as any).detail as string;
        if (detail.includes('Email')) {
          throw new BadRequestException(messages.emailAlreadyExists);
        } else if (detail.includes('ContactNo')) {
          throw new BadRequestException(messages.phoneAlreadyExists);
        }
      }
      throw new BadRequestException(messages.badRequest);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    this.logger.log(`Attempting to delete company with ID: ${id}`);
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(messages.companyNotFoundDelete.replace('{id}', id.toString()));
    }
    await this.companyRepository.remove(company);
    return { message: messages.companyDeletedWithId.replace('{id}', id.toString()) };
  }
}
