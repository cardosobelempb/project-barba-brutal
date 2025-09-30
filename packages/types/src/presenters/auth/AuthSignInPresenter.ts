import { UserEntity } from "../../entities";

export class AuthSignInPresenter {
  static toHTTP(entity: Partial<UserEntity>) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      barber: entity.barber,
      role: entity.role,
    }
  }
}
