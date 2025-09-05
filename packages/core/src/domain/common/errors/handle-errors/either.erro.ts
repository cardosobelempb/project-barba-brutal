import { Left } from './left.erros'
import { Right } from './right.erro'

export type Either<L, R> = Left<L, R> | Right<L, R>

export const left = <L, R = never>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <R, L = never>(value: R): Either<L, R> => {
  return new Right(value)
}
