import { AggregateAbstract } from "../abstract";
import { UUIDVO } from "../values-objects";
import { DomainEventAbstract } from "./DomainEventAbstract";

/**
 * DomainEventCallback
 * - Tipagem correta: recebe o próprio evento concreto, não `any`.
 * - Mantém genericidade sem perder segurança.
 */
type DomainEventCallback<E extends DomainEventAbstract = DomainEventAbstract> =
  (event: E) => void;

/**
 * DomainEvents
 *
 * Responsável por:
 * - Registrar callbacks (event handlers)
 * - Rastrear agregados com eventos pendentes (unit of work)
 * - Despachar eventos quando solicitado
 *
 * Observações:
 * - Classe estática por simplicidade, mas pode futuramente virar serviço injetável.
 * - Não cria acoplamento direto com agregados — recebe apenas interface mínima.
 */
export class DomainEvents {
  /** Map de handlers por nome de evento */
  private static handlersMap: {
    [eventName: string]: Array<DomainEventCallback<DomainEventAbstract>>;
  } = {};

  /** Agregados que têm eventos pendentes */
  private static markedAggregates: AggregateAbstract<unknown>[] = [];

  /** Útil para testes */
  public static shouldRun = true;

  // ---------------------------------------------------------------------------
  // MARK AGGREGATE
  // ---------------------------------------------------------------------------

  /**
   * Marca um agregado para despacho posterior.
   * Este método é chamado quando um agregador registra um DomainEvent.
   */
  public static markAggregateForDispatch(
    aggregate: AggregateAbstract<unknown>
  ): void {
    const alreadyMarked =
      this.findMarkedAggregateByID(aggregate.id) !== undefined;

    if (!alreadyMarked) {
      this.markedAggregates.push(aggregate);
    }
  }

  // ---------------------------------------------------------------------------
  // DISPATCH
  // ---------------------------------------------------------------------------

  /**
   * Realiza o despacho de todos os eventos de um agregado específico
   */
  public static dispatchEventsForAggregate(id: UUIDVO): void {
    const aggregate = this.findMarkedAggregateByID(id);
    if (!aggregate) return;

    this.dispatchAggregateEvents(aggregate);
    aggregate.clearEvents();
    this.removeAggregateFromMarkedDispatchList(aggregate);
  }

  /**
   * Despacha os eventos do agregado
   */
  private static dispatchAggregateEvents(
    aggregate: AggregateAbstract<unknown>
  ): void {
    for (const event of aggregate.domainEvents) {
      this.dispatch(event);
    }
  }

  /**
   * Despacha um único evento para seus handlers registrados
   */
  private static dispatch(event: DomainEventAbstract): void {
    const eventClassName = event.constructor.name;
    const handlers = this.handlersMap[eventClassName];

    if (!handlers || handlers.length === 0) return;

    for (const handler of handlers) {
      handler(event);
    }
  }

  // ---------------------------------------------------------------------------
  // REGISTRATION
  // ---------------------------------------------------------------------------

  /**
   * Registra um handler para um determinado nome de evento
   */
  public static register<E extends DomainEventAbstract>(
    callback: DomainEventCallback<E>,
    eventClassName: string
  ): void {
    const list = this.handlersMap[eventClassName] ?? [];
    this.handlersMap[eventClassName] = [
      ...list,
      callback as DomainEventCallback<DomainEventAbstract>,
    ];
  }

  // ---------------------------------------------------------------------------
  // INTERNAL HELPERS
  // ---------------------------------------------------------------------------

  /** Retorna agregado marcado pelo ID */
  private static findMarkedAggregateByID(
    id: UUIDVO
  ): AggregateAbstract<unknown> | undefined {
    return this.markedAggregates.find((aggregate) => aggregate.id.equals(id));
  }

  /** Remove agregado da lista de marcados */
  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateAbstract<unknown>
  ): void {
    this.markedAggregates = this.markedAggregates.filter(
      (a) => !a.equals(aggregate)
    );
  }

  // ---------------------------------------------------------------------------
  // CLEANUP
  // ---------------------------------------------------------------------------

  /** Limpa todos os handlers registrados (útil para testes) */
  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  /** Limpa agregados marcados (útil para testes) */
  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }
}
