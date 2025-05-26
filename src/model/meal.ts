export type MealGroup = {
  date: string;
  meals: Meal[];
};

export type Meal = {
  tgId?: string;
  type?: MealType | null;
  date?: string | null;
  kcal?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  barcode?: string;
  productName?: string;
  amountGrams?: number;
};

export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER'
}
