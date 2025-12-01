/**
 * Classe base para implementação de casos de uso na camada de aplicação.
 * @template TRepo - Tipo do repositório (ou gateway) que o caso de uso utiliza.
 * @template TRequest - Tipo da requisição recebida pelo caso de uso.
 * @template TResponse - Tipo da resposta retornada pelo caso de uso.
 */
export abstract class AbstractUseCase<
  TRepo,
  TResponse,
  TRequest = void // Permite use cases sem entrada
> {
  /**
   * O repositório é protegido para que classes filhas possam acessá-lo,
   * mas ninguém fora da hierarquia pode alterá-lo.
   */
  protected readonly repository: TRepo;

  constructor(repository: TRepo) {
    this.repository = repository;
  }

  /**
   * Método principal a ser implementado por todos os casos de uso.
   * Representa a intenção de negócio que o caso de uso encapsula.
   */
  abstract execute(request: TRequest): Promise<TResponse>;
}
