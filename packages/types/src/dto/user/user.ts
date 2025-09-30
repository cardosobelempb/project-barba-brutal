 export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    barber?: boolean | null;
    role?: number | null
    createdAt: Date
    updatedAt?: Date | null,
    deletedAt?: Date | null,
  }
