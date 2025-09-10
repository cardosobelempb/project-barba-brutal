import { UUIDVO } from '../common'

export abstract class Entity<Props> {
  private _id: UUIDVO
  readonly props: Props

  protected constructor(props: Props, id?: UUIDVO) {
    this.props = props
    this._id = id ?? new UUIDVO(id)
  }

  get id() {
    return this._id
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id.getValue() === this._id.getValue()) {
      return true
    }

    return false
  }
}
