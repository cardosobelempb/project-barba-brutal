import { Entity, Optional, UUIDVO } from '@repo/core';

export interface StudentProps {
  name: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}


export class StudentEntity extends Entity<StudentProps> {
  get name() {
    return this.props.name;
  }

  static create(
     props: Optional<StudentProps, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const Student = new StudentEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return Student
  }
}
