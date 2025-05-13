import { Controller, Post, Get, Param, Query, UseGuards, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/customers/:id/media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadMedia(
    @Param('id') customerId: string,
    @Query('type') type: 'photo' | 'schoolFootage',
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.mediaService.uploadMedia(customerId, files, type);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMedia(
    @Param('id') customerId: string,
    @Query('type') type?: string,
  ) {
    return this.mediaService.getMedia(customerId, type);
  }
}