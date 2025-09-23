import { UserEntity } from "../../entities";

export class AuthRegisterPresenter {
  static toHTTP(entity: UserEntity) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
    }
  }
}
