import { UserPayloadDTO } from "../user";

export interface TokenDTO extends UserPayloadDTO{
  accessToken?: string,
  refreshToken?: string
}
