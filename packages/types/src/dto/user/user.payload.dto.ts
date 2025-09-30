 export interface UserPayloadDTO {
    userId: string;
    name: string;
    email: string;
    barber?: boolean | null;
    role?: number | null;
  }
