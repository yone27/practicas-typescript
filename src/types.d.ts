export interface Sub {
  nick: string;
  subMonths: number;
  avatar: string;
  description?: string;
}

export type SubsResponseFromApi = Array<{
  name: string;
  email: string;
  phone: number;
  description?: string;
}>;
