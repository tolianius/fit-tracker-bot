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

export type DailyMeal = {
  kcal: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  mealsByType: MealByType[];
};

export type MealByType = {
  type: MealType;
  nutriments: {
    proteins: number;
    fat: number;
    carbohydrates: number;
  };
  meals: Meal[];
};

export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER'
}
