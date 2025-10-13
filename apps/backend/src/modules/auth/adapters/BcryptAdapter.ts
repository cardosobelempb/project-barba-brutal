import { HashComparer, HashGenerator } from '@repo/core';
import { compare as bcryptCompare, hash as bcryptHash } from 'bcryptjs';

/**
 * Constante que define o custo (salt rounds) para geração do hash.
 * Valores maiores aumentam a segurança, mas impactam na performance.
 */
const SALT_ROUNDS = 8;

/**
 * Implementa os contratos HashGenerator e HashComparer utilizando bcrypt.
 * Aplica criptografia para senhas e compara valores em texto com hashes.
 */
export class BcryptAdapter implements HashGenerator, HashComparer {
  /**
   * Gera um hash seguro baseado no valor em texto fornecido.
   * @param plain - Texto puro a ser criptografado (ex: senha).
   * @returns Hash criptografado.
   */
  hash(plain: string): Promise<string> {
    return bcryptHash(plain, SALT_ROUNDS);
  }

  /**
   * Compara um valor em texto com um hash para verificar correspondência.
   * @param plain - Texto puro (ex: senha inserida pelo usuário).
   * @param hashed - Hash previamente armazenado (ex: do banco de dados).
   * @returns Booleano indicando se os valores correspondem.
   */
  compare(plain: string, hashed: string): Promise<boolean> {
    return bcryptCompare(plain, hashed);
  }
}

/**
 * Identificadores simbólicos para uso em injeção de dependência.
 */
export const HASH_GENERATOR = 'BcryptAdapter';
export const HASH_COMPARER = 'BcryptAdapter';
