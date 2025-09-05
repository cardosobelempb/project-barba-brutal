export abstract class MapperRoot<Entity, Persistence> {
  abstract toDomain(raw: Persistence): Entity
  abstract toPersistence(entity: Entity): Persistence
}
