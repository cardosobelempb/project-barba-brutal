export interface FieldMessage {
  fieldName: string
  message: string
}

export class FieldMessage {
  constructor(
    public fieldName: string,
    public message: string,
  ) {}
}
