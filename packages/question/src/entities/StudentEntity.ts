import { UUIDVO } from '@repo/core';

export interface StudentProps {
  id: UUIDVO
  name: string
}


export class StudentEntity {
  public id?: UUIDVO
  public name: string;

  constructor(props:StudentProps, id?: UUIDVO) {
    this.id = id ?? new UUIDVO(id),
    this.name = props.name;
  }
}
