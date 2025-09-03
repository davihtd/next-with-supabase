export interface Store {
  id: string;
  name: string;
  categories: string[];
  zone: string;
  logo: string;
  website: string;
  description: string;
  isFeatured: boolean;
  rating: number;
}

export interface Zone {
  id: string;
  name: string;
  storeCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  storeCount: number;
}