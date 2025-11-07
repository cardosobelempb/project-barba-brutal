import { UUIDVO } from '@repo/core';

export interface InstructorProps {
  id: UUIDVO
  name: string
}


export class InstructorEntity {
  public id?: UUIDVO
  public name: string;

  constructor(props: InstructorProps, id?: UUIDVO) {
    this.id = id ?? new UUIDVO(id),
    this.name = props.name;
  }
}
