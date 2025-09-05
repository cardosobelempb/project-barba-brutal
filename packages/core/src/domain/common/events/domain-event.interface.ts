import { UUIDVO } from '../values-objects'

export interface IDomainEvent {
  ocurredAt: Date
  getAggregateId(): UUIDVO
}
