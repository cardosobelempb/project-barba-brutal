import { JwtAbstract } from '@repo/core';
import * as jwt from 'jsonwebtoken';

export class JwtApp extends JwtAbstract {
  private readonly secretKey = process.env.JWT_SECRET || 'fallback-secret';

  async createToken(payload: Record<string, unknown>): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          reject(new Error('Erro ao gerar o token'));
        } else if (token) {
          resolve(token);
        } else {
          reject(new Error('Token indefinido'));
        }
      });
    });
  }

  async checkToken(token: string): Promise<Record<string, unknown>> {
    try {
      const decoded = await new Promise<Record<string, unknown>>(
        (resolve, reject) => {
          jwt.verify(token, this.secretKey, (err, decoded) => {
            if (err || !decoded) {
              reject(new Error('Token inválido'));
            } else {
              resolve(decoded as Record<string, unknown>);
            }
          });
        },
      );

      return decoded;
    } catch (err) {
      throw new Error('Token inválido');
    }
  }
}

export const JWT_APP = 'JwtApp';
