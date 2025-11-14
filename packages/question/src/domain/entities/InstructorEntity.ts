import { Entity, Optional, UUIDVO } from '@repo/core';

export interface InstructorProps {
  name: string
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}


export class InstructorEntity extends Entity<InstructorProps> {
  get name() {
    return this.props.name;
  }

  static create(
     props: Optional<InstructorProps, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const Instructor = new InstructorEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return Instructor
  }
}
