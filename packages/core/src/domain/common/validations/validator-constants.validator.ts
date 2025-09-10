export class ValidatorConstants {
  private constructor() {}

  static readonly SIZE_MIN: number = 5
  static readonly SIZE_MAX: number = 60

  static readonly MISSING: string = '.missing'
  static readonly BELOW_MIN_VALUE: string = '.belowMinValue'

  static readonly DUPLICATE: string = ' Esse campo duplicate. '

  static readonly REQUIRED_FIELD: string =
    ' Esse campo é de preenchimento obrigatório. '

  // static readonly REQUIRED_EMAIL: string = "Favor entrar um email válido";
  static readonly REQUIRED_PHONE: string =
    ' O campo Telefone deve conter apenas dígitos. '

  static readonly INVALID_EMAIL: string =
    ' O endereço usado no campo Email não é um endereço de e-mail válido. '

  static readonly REQUIRED_NUMBER: string =
    ' O campo aceitar apenas números positivo e não letras '

  static readonly REQUIRED_EMAIL_EXIST: string =
    ' já existe em nossa base de dados. '

  static readonly REQUIRED_EXIST: string = ' Já existe em nossa base de dados. '
  static readonly NAME_EXIST: string = ' Já existe em nossa base de dados. '
  static readonly REQUIRED_PRICE_POSITIVO: string =
    ' Preço deve ser um valor positivo. '

  static readonly REQUIRED_DATA_PRESENT: string =
    ' A data do produto não pode ser futura. '

  static readonly INVALID: string = ' invalid format. '
  static readonly ORDER_BY: string = ' orderBy. '

  static readonly MAX_LENGTH: string = ' Campo deve ser menor que '
  static readonly MIN_LENGTH: string = ' Campo deve ser maior que '
  static readonly MAX_VALUE: string = ' Campo deve ser menor que '
  static readonly MIN_VALUE: string = ' Campo deve ser maior que '
  static readonly MIN_MAX: string = ' Campo deve ter entre 5 e 15 caracteres. '
  static readonly BETWEEN_LENGTH: string =
    ' Campo deve ter entre 5 e 15 caracteres. '

  static readonly INVALID_ORDER_DATE: string = ' Order data inválida. '
  static readonly IN_THE_PAST: string = ' data no passado. '
  static readonly EXCEEDS_DURATION: string = ' excede a duração. '
  static readonly OVERLAPS: string = ' comflito de datas. '
}
