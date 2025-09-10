import { Right } from './right.erro'

// Error
export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }

  // Para compatibilidade com API funcional
  map<T>(_: (r: R) => T): Left<L, T> {
    return new Left(this.value)
  }

  fold<T>(onLeft: (l: L) => T, _?: (r: R) => T): T {
    return onLeft(this.value)
  }

  toString() {
    return `Left(${JSON.stringify(this.value)})`
  }
}
