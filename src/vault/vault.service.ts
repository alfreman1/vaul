import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';

@Injectable()
export class VaultService {
  constructor(private prisma: PrismaService) {}

  create(createVaultDto: CreateVaultDto) {
    return this.prisma.vaultEntry.create({ data: createVaultDto });
  }

  findDrafts() {
    return this.prisma.vaultEntry.findMany();
  }

  findAll() {
    return this.prisma.vaultEntry.findMany();
  }

  findOne(id: number) {
    return this.prisma.vaultEntry.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  update(id: number, updateVaultDto: UpdateVaultDto) {
    return this.prisma.vaultEntry.update({
      where: { id },
      data: updateVaultDto,
    });
  }

  remove(id: number) {
    return this.prisma.vaultEntry.delete({ where: { id } });
  }
}
