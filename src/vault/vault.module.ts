import { Module } from '@nestjs/common';
import { VaultService } from './vault.service';
import { VaultController } from './vault.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VaultController],
  providers: [VaultService],
  imports: [PrismaModule],
})
export class VaultModule {}
