import { UserPayloadDTO } from "../user";

export interface TokenDTO {
  user: UserPayloadDTO
  accessToken?: string,
  refreshToken?: string
}
