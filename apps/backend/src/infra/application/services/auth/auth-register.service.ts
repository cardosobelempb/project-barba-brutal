import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  barber: boolean;
};

@Injectable()
export class AuthRegisterService {
  constructor(private readonly primaService: PrismaService) {}

  async execute(data: User): Promise<void> {
    console.log('AuthRegisterService=>');

    await this.primaService.user.create({ data });
  }
}
