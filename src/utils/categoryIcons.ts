import { 
  ShoppingCart,
  Utensils,
  Cross,
  GraduationCap,
  Laptop,
  Shirt,
  Home,
  Car,
  Dumbbell,
  Scissors
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  'Alimentación': ShoppingCart,
  'Restaurantes': Utensils,
  'Salud': Cross,
  'Educación': GraduationCap,
  'Tecnología': Laptop,
  'Moda': Shirt,
  'Hogar': Home,
  'Automoción': Car,
  'Deportes': Dumbbell,
  'Belleza': Scissors,
};

export function getCategoryIcon(category: string) {
  return categoryIcons[category] || ShoppingCart;
}

export function getCategoryIconName(category: string): string {
  const iconMap: Record<string, string> = {
    'Alimentación': 'shopping-cart',
    'Restaurantes': 'utensils',
    'Salud': 'cross',
    'Educación': 'graduation-cap',
    'Tecnología': 'laptop',
    'Moda': 'shirt',
    'Hogar': 'home',
    'Automoción': 'car',
    'Deportes': 'dumbbell',
    'Belleza': 'scissors',
  };
  
  return iconMap[category] || 'shopping-cart';
}