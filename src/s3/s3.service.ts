import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly region = this.configService.getOrThrow('AWS_S3_REGION');
  private readonly s3Client = new S3Client({
    region: this.region,
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(key: string, file: Buffer) {
    const bucket = this.configService.get('AWS_BUCKET');

    const input: PutObjectCommandInput = {
      Bucket: bucket,
      Key: key,
      Body: file,
    };

    try {
      const response: PutObjectCommandOutput = await this.s3Client.send(
        new PutObjectCommand(input),
      );

      if (response.$metadata.httpStatusCode === 200) {
        const url = `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
        return url;
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
