import dayjs from 'dayjs';
import { makeAutoObservable } from 'mobx';

import { getAdjustedValue } from '@/lib/getAdjustedValue';
import { DailyMeal, MealGroup, MealType } from '@/model/meal';

export class MealStore {
  dailyMeal: DailyMeal | null = null;
  weekMeals: MealGroup[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setWeekMeals(meals: MealGroup[], currentDate: Date) {
    this.weekMeals = meals;

    const currentDayMeal = meals.find((group: MealGroup) => dayjs(currentDate).format('DD-MM-YYYY') === group?.date);
    if (currentDayMeal) {
      this.dailyMeal = {
        kcal: currentDayMeal.meals.reduce((sum, meal) => sum + (meal.kcal ?? 0), 0),
        proteins: currentDayMeal.meals.reduce((sum, item) => sum + item.protein, 0),
        carbohydrates: currentDayMeal.meals.reduce((sum, item) => sum + item.carbs, 0),
        fat: currentDayMeal.meals.reduce((sum, item) => sum + item.fat, 0),
        mealsByType: [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER].map((type) => {
          const filteredByType = currentDayMeal.meals.filter((x) => x.type === type);
          return {
            type,
            nutriments: {
              proteins: filteredByType.reduce((sum, meal) => sum + getAdjustedValue(meal.protein, meal.amountGrams), 0),
              fat: filteredByType.reduce((sum, meal) => sum + getAdjustedValue(meal.fat, meal.amountGrams), 0),
              carbohydrates: filteredByType.reduce(
                (sum, meal) => sum + getAdjustedValue(meal.carbs, meal.amountGrams),
                0
              )
            },
            meals: filteredByType
          };
        })
      };
    } else {
      this.dailyMeal = {
        kcal: 0,
        carbohydrates: 0,
        mealsByType: [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER].map((type) => {
          return {
            type,
            nutriments: {
              proteins: 0,
              carbohydrates: 0,
              fat: 0
            },
            meals: []
          };
        }),
        fat: 0,
        proteins: 0
      };
    }
  }
}

export const mealStore = new MealStore();
