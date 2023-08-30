import {
  Car,
  CircleEllipsis,
  PiggyBankIcon,
  Popcorn,
  ShoppingCart,
  UtensilsCrossed,
} from 'lucide-react';

export const categories = [
  'FOOD',
  'TRANSPORT',
  'ENTERTAINMENT',
  'UTILITIES',
  'SAVINGS',
  'OTHER',
] as const;

export const categoryIcon = {
  FOOD: UtensilsCrossed,
  TRANSPORT: Car,
  ENTERTAINMENT: Popcorn,
  UTILITIES: ShoppingCart,
  SAVINGS: PiggyBankIcon,
  OTHER: CircleEllipsis,
};
