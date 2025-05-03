import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/createFileDto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FileType } from './domain/file';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Files')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'assign',
  version: '1',
})
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiCreatedResponse({
    type: FileType,
  })
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }
}
