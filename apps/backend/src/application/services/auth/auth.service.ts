import { JwtService } from '@nestjs/jwt';

export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async createTken() {
    // return this.jwtService.sign();
  }
  async checkToken(token: string) {
    // return this.jwtService.verify(token);
  }
}
