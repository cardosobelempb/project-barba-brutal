import { Body, Controller, Post } from '@nestjs/common';
import { BadRequestError } from '@repo/core';
// Ensure UserPayloadDTO is correctly imported from the right path
import { UserPayloadDTO } from '@repo/types';
import { JwtApp } from 'src/infra/jwt/JwtApp';

@Controller('/auth')
export class AuthMeController {
  constructor(private readonly jwtApp: JwtApp<UserPayloadDTO>) {}

  @Post('/me')
  handle(@Body() body: { accessToken: string }): UserPayloadDTO | null {
    if (!body.accessToken) {
      throw new BadRequestError('Access token is required');
    }
    return this.jwtApp.verifyAccessToken(body.accessToken);
  }
}
