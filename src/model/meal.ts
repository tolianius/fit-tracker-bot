export type Meal = {
  tgId?: string;
  type?: MealType | null;
  date?: string | null; // формат YYYY-MM-DD
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
