export interface Product {
  id: number;
  description: string;
  cost: number;
  image?: Buffer | null;
}