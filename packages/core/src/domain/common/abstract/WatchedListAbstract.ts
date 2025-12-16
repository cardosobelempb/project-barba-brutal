/**
 * Versão altamente otimizada da WatchedList usando Map para
 * permitir operações O(1) baseadas em uma chave única.
 *
 * Fluxos rastreados:
 * - Itens adicionados
 * - Itens removidos
 * - Estado atual
 *
 * T = tipo de item de domínio (entidade, value object, DTO)
 */
export abstract class WatchedListAbstract<T> {
  /** Mapa atual de itens (estado vivo da coleção) */
  protected currentItems: Map<string, T>;

  /** Snapshot inicial (imutável) */
  private readonly initialItems: Map<string, T>;

  /** Itens adicionados após o estado inicial */
  private added: Map<string, T>;

  /** Itens removidos após o estado inicial */
  private removed: Map<string, T>;

  /**
   * Cada item deve fornecer uma chave única.
   * Ex: ID, GUID, código composto, etc.
   */
  protected abstract getItemKey(item: T): string;

  constructor(initial: T[] = []) {
    this.currentItems = new Map(initial.map((i) => [this.getItemKey(i), i]));
    this.initialItems = new Map(initial.map((i) => [this.getItemKey(i), i]));
    this.added = new Map();
    this.removed = new Map();
  }

  // -----------------------------------------------------
  // Getters públicos
  // -----------------------------------------------------

  /** Retorna itens atuais (array) */
  public getItems(): T[] {
    return Array.from(this.currentItems.values());
  }

  /** Retorna itens adicionados */
  public getNewItems(): T[] {
    return Array.from(this.added.values());
  }

  /** Retorna itens removidos */
  public getRemovedItems(): T[] {
    return Array.from(this.removed.values());
  }

  // -----------------------------------------------------
  // Consultas
  // -----------------------------------------------------

  /** Item existe no estado atual? */
  public exists(item: T): boolean {
    return this.currentItems.has(this.getItemKey(item));
  }

  /** Existia no snapshot inicial? */
  private existedInitially(item: T): boolean {
    return this.initialItems.has(this.getItemKey(item));
  }

  // -----------------------------------------------------
  // Mutação
  // -----------------------------------------------------

  /** Adiciona item com rastreamento O(1) */
  public add(item: T): void {
    const key = this.getItemKey(item);

    const wasRemoved = this.removed.has(key);
    const existedInitially = this.existedInitially(item);

    // Se estava marcado como removido, desfaz remoção
    if (wasRemoved) {
      this.removed.delete(key);
    }

    // Se não existia antes, registra como novo
    if (!this.added.has(key) && !existedInitially) {
      this.added.set(key, item);
    }

    // Garante na lista atual
    this.currentItems.set(key, item);
  }

  /** Remove item com rastreamento O(1) */
  public remove(item: T): void {
    const key = this.getItemKey(item);

    const wasAdded = this.added.has(key);
    const wasRemoved = this.removed.has(key);

    // Sempre remove do estado atual
    this.currentItems.delete(key);

    // Se era um item novo, basta desfazer add
    if (wasAdded) {
      this.added.delete(key);
      return;
    }

    // Se já esteve removido, ignora
    if (!wasRemoved) {
      this.removed.set(key, item);
    }
  }

  /** Atualiza estado completo (mantendo histórico) */
  public update(items: T[]): void {
    const next = new Map(items.map((i) => [this.getItemKey(i), i]));

    const newItems: Map<string, T> = new Map();
    const removedItems: Map<string, T> = new Map();

    // Itens inseridos
    next.forEach((item, key) => {
      if (!this.currentItems.has(key)) {
        newItems.set(key, item);
      }
    });

    // Itens removidos
    this.currentItems.forEach((item, key) => {
      if (!next.has(key)) {
        removedItems.set(key, item);
      }
    });

    this.currentItems = next;
    this.added = newItems;
    this.removed = removedItems;
  }
}

/**
  📦 Exemplo prático
  interface Produto {
    id: string;
    nome: string;
  }

  class ListaProdutos extends WatchedListMap<Produto> {
    protected getItemKey(item: Produto): string {
      return item.id;
    }
  }

  const lista = new ListaProdutos([{ id: "1", nome: "Caneta" }]);

  lista.add({ id: "2", nome: "Lápis" });
  lista.remove({ id: "1", nome: "Caneta" });

  console.log(lista.getItems());         // [ { id:"2", nome:"Lápis" } ]
  console.log(lista.getNewItems());      // [ { id:"2", nome:"Lápis" } ]
  console.log(lista.getRemovedItems());  // [ { id:"1", nome:"Caneta" } ]

 */
