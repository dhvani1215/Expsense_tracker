
import { BookOpen, Coffee, CreditCard, Gift, Home, ShoppingBag, Utensils, Zap } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: React.ElementType;
};

export const CATEGORIES: Category[] = [
  {
    id: "housing",
    name: "Housing",
    color: "bg-blue-500",
    icon: Home,
  },
  {
    id: "food",
    name: "Food & Dining",
    color: "bg-green-500",
    icon: Utensils,
  },
  {
    id: "shopping",
    name: "Shopping",
    color: "bg-pink-500",
    icon: ShoppingBag,
  },
  {
    id: "utilities",
    name: "Utilities",
    color: "bg-yellow-500",
    icon: Zap,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    color: "bg-purple-500",
    icon: BookOpen,
  },
  {
    id: "coffee",
    name: "Coffee",
    color: "bg-amber-500",
    icon: Coffee,
  },
  {
    id: "gifts",
    name: "Gifts",
    color: "bg-red-500",
    icon: Gift,
  },
  {
    id: "uncategorized",
    name: "Uncategorized",
    color: "bg-gray-500",
    icon: CreditCard,
  },
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type Transaction = {
  id: string;
  date: Date;
  amount: number;
  description: string;
  categoryId: string;
};

export type Budget = {
  id: string;
  categoryId: string;
  amount: number;
  spent: number;
};

// Sample data for development
export const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    date: new Date(2023, 7, 1),
    amount: 2000,
    description: "Monthly Rent",
    categoryId: "housing",
  },
  {
    id: "t2",
    date: new Date(2023, 7, 2),
    amount: 125.30,
    description: "Grocery Store",
    categoryId: "food",
  },
  {
    id: "t3",
    date: new Date(2023, 7, 3),
    amount: 45.99,
    description: "Electric Bill",
    categoryId: "utilities",
  },
  {
    id: "t4",
    date: new Date(2023, 7, 4),
    amount: 67.80,
    description: "Restaurant Dinner",
    categoryId: "food",
  },
  {
    id: "t5",
    date: new Date(2023, 7, 5),
    amount: 199.99,
    description: "New Shoes",
    categoryId: "shopping",
  },
  {
    id: "t6",
    date: new Date(2023, 7, 6),
    amount: 14.50,
    description: "Coffee Shop",
    categoryId: "coffee",
  },
  {
    id: "t7",
    date: new Date(2023, 7, 7),
    amount: 32.99,
    description: "Book Store",
    categoryId: "entertainment",
  },
  {
    id: "t8",
    date: new Date(2023, 7, 8),
    amount: 49.99,
    description: "Birthday Gift",
    categoryId: "gifts",
  },
];

export const SAMPLE_BUDGETS: Budget[] = [
  {
    id: "b1",
    categoryId: "housing",
    amount: 2500,
    spent: 2000,
  },
  {
    id: "b2",
    categoryId: "food",
    amount: 500,
    spent: 193.10,
  },
  {
    id: "b3",
    categoryId: "utilities",
    amount: 300,
    spent: 45.99,
  },
  {
    id: "b4",
    categoryId: "shopping",
    amount: 400,
    spent: 199.99,
  },
  {
    id: "b5",
    categoryId: "entertainment",
    amount: 200,
    spent: 32.99,
  },
  {
    id: "b6",
    categoryId: "coffee",
    amount: 50,
    spent: 14.50,
  },
  {
    id: "b7",
    categoryId: "gifts",
    amount: 100,
    spent: 49.99,
  },
];
