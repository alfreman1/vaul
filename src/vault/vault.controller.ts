import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VaultService } from './vault.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VaultEntity } from './entities/vault.entity';

@Controller('vault')
@ApiTags('vault')
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Post()
  @ApiCreatedResponse({ type: VaultEntity })
  async create(@Body() createVaultDto: CreateVaultDto) {
    return new VaultEntity(await this.vaultService.create(createVaultDto));
  }

  @Get()
  @ApiOkResponse({ type: VaultEntity, isArray: true })
  async findAll() {
    const vault = await this.vaultService.findAll();
    return vault.map((vault) => new VaultEntity(vault));
  }

  @Get('drafts')
  @ApiOkResponse({ type: VaultEntity, isArray: true })
  async findDrafts() {
    const drafts = await this.vaultService.findDrafts();
    return drafts.map((draft) => new VaultEntity(draft));
  }

  @Get(':id')
  @ApiOkResponse({ type: VaultEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new VaultEntity(await this.vaultService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: VaultEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVaultDto: UpdateVaultDto,
  ) {
    return new VaultEntity(await this.vaultService.update(id, updateVaultDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: VaultEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new VaultEntity(await this.vaultService.remove(id));
  }
}
