// import { NameVO } from './name.vo'
// import { BadRequestError } from '../../errors'
// import { describe, expect, it } from 'vitest'

// describe('NameVO', () => {
//   it('should create a valid NameVO', () => {
//     const name = new NameVO(' João da Silva ')
//     expect(name.getValue()).toBe('João da Silva')
//   })

//   it('should trim and normalize name with multiple spaces', () => {
//     const name = new NameVO(' Maria   das   Dores ')
//     expect(name.getValue()).toBe('Maria das Dores')
//   })

//   it('should throw if name is empty', () => {
//     expect(() => new NameVO('')).toThrow(BadRequestError)
//   })

//   it('should throw if name is too short', () => {
//     expect(() => new NameVO('J S', { minLength: 5 })).toThrow(BadRequestError)
//   })

//   it('should throw if name is too long', () => {
//     const longName = 'A'.repeat(60) + ' B'
//     expect(() => new NameVO(longName, { maxLength: 50 })).toThrow(
//       BadRequestError,
//     )
//   })

//   it('should throw if no surname is provided', () => {
//     expect(() => new NameVO('João')).toThrow(BadRequestError)
//   })

//   it('should throw if name contains invalid characters', () => {
//     expect(() => new NameVO('João # Silva')).toThrow(BadRequestError)
//   })

//   it('should consider two NameVOs equal if values match', () => {
//     const name1 = new NameVO('Ana Maria')
//     const name2 = new NameVO('Ana Maria')
//     expect(name1.equals(name2)).toBe(true)
//   })

//   it('should consider two NameVOs different if values differ', () => {
//     const name1 = new NameVO('Carlos Silva')
//     const name2 = new NameVO('Carlos Souza')
//     expect(name1.equals(name2)).toBe(false)
//   })
// })
