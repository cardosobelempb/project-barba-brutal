import { Entity, Optional, UUIDVO } from "@repo/core";

import { User } from "../dto";

export class UserEntity extends Entity<User> {
  private static props: User;
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  get barber() {
    return this.props.barber
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get deletedAt() {
    return this.props.updatedAt
  }


  private touch() {
    this.props.updatedAt = new Date()
  }

  static resetPassword(newPassword: string) {
    this.props.password = newPassword
    this.touch();
  }
  static touch() {
    throw new Error("Method not implemented.");
  }

  static create(
    props: Optional<User, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const User = new UserEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return User
  }
}
