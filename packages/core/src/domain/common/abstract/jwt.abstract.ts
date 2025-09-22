export abstract class JwtAbstract {
  // Método para criar o token. O payload pode ser mais específico se soubermos os dados que estarão nele.
  abstract createToken(payload: Record<string, any>): Promise<string>;

  // Método para verificar a validade do token. Em vez de retornar apenas string, pode retornar um objeto ou booleano.
  abstract checkToken(token: string): Promise<boolean | Record<string, any>>;
}
