import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { VaultService } from './vault.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VaultEntity } from './entities/vault.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('vault')
@ApiTags('vault')
@UseGuards(JwtAuthGuard)
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VaultEntity })
  async create(@Body() createVaultDto: CreateVaultDto) {
    return new VaultEntity(await this.vaultService.create(createVaultDto));
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: VaultEntity, isArray: true })
  async findAll() {
    const vault = await this.vaultService.findAll();
    return vault.map((vault) => new VaultEntity(vault));
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: VaultEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new VaultEntity(await this.vaultService.findOne(id));
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VaultEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVaultDto: UpdateVaultDto,
  ) {
    return new VaultEntity(await this.vaultService.update(id, updateVaultDto));
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: VaultEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new VaultEntity(await this.vaultService.remove(id));
  }
}
