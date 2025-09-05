import { Left } from './left.erros'

// Success
export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }

  // Permite transformar o valor interno, se for Right
  map<T>(fn: (r: R) => T): Right<L, T> {
    return new Right(fn(this.value))
  }

  fold<T>(_: (l: L) => T, onRight: (r: R) => T): T {
    return onRight(this.value)
  }

  toString() {
    return `Right(${JSON.stringify(this.value)})`
  }
}
