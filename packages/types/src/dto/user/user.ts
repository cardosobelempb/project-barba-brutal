 export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    barber: boolean;
    createdAt: Date
    updatedAt?: Date | null,
    deletedAt?: Date | null,
  }
