import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);

  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }
    return company;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.companyRepository.preload({
      id,
      ...updateCompanyDto,
    });
    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }
    return this.companyRepository.save(company);
  }

  async remove(id: number): Promise<{ message: string }> {
    this.logger.log(`Attempting to remove company with id: ${id}`);
    const company = await this.companyRepository.findOneBy({ id });

    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }

    await this.companyRepository.remove(company);
    return { message: `Company with id ${id} deleted successfully.` };
  }
}
