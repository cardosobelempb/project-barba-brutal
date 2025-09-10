import { BadRequestError } from '../../errors'
import { LatitudeVO } from './latitude.vo'
import { LongitudeVO } from './longitude.vo'

export class LocationVO {
  private constructor(
    public readonly latitude: LatitudeVO,
    public readonly longitude: LongitudeVO,
  ) {
    LocationVO.validate(
      new LatitudeVO(latitude.value),
      new LongitudeVO(longitude.value),
    )
  }

  // Método Factory para criar uma nova instância de GeoLocation
  public static create(
    latitude: LatitudeVO,
    longitude: LongitudeVO,
  ): LocationVO {
    return new LocationVO(
      new LatitudeVO(latitude.value),
      new LongitudeVO(longitude.value),
    )
  }

  // Validação para garantir que as coordenadas estejam corretas
  private static validate(latitude: LatitudeVO, longitude: LongitudeVO): void {
    if (latitude.value < -90 || latitude.value > 90) {
      throw new BadRequestError(
        // `Latitude inválida: ${latitude}. Deve estar entre -90 e 90.`,
        `Invalid latitude: ${latitude}. Must be between -90 and 90.`,
      )
    }
    if (longitude.value < -180 || longitude.value > 180) {
      throw new BadRequestError(
        // `Longitude inválida: ${longitude}. Deve estar entre -180 e 180.`,
        `Invalid longitude: ${longitude}. Must be between -180 and 180.`,
      )
    }
  }

  // Método para calcular a distância entre dois pontos utilizando a fórmula de Haversine
  // A unidade pode ser 'km' (qukilômetros) ou 'm' (metros)
  public distanceTo(other: LocationVO, unit: 'km' | 'm' = 'km'): number {
    const R = unit === 'm' ? 6371000 : 6371 // Raio da Terra em metros ou quilômetros, dependendo da unidade
    const toRadians = (degrees: number) => degrees * (Math.PI / 180) // Converte graus para radianos

    // Calculando as diferenças de latitude e longitude
    const dLat = toRadians(other.latitude.value - this.latitude.value)
    const dLon = toRadians(other.longitude.value - this.longitude.value)

    const lat1 = toRadians(this.latitude.value)
    const lat2 = toRadians(other.latitude.value)

    // Fórmula de Haversine
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    // Distância com a unidade escolhida
    return R * c
  }
}
