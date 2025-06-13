'use client';

import { createContext, PropsWithChildren, useContext } from 'react';

import { mealStore, MealStore, SessionStore, sessionStore } from '@/stores';

type Stores = {
  sessionStore: SessionStore;
  mealStore: MealStore;
};

const StoresContext = createContext<Stores | null>(null);

export const useMealStore = () => {
  const stores = useContext(StoresContext);
  if (!stores) throw new Error('useMealStore must be used within MobxProvider');
  return stores.mealStore;
};

export const useSessionStore = () => {
  const stores = useContext(StoresContext);
  if (!stores) throw new Error('useSessionStore must be used within MobxProvider');
  return stores.sessionStore;
};

export function MobxProvider({ children }: PropsWithChildren) {
  return <StoresContext.Provider value={{ sessionStore, mealStore }}>{children}</StoresContext.Provider>;
}
