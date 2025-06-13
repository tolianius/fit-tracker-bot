'use client';

import { createContext, PropsWithChildren, useContext } from 'react';

import { SessionStore, sessionStore } from '@/stores';

const SessionContext = createContext<SessionStore | null>(null);

export const useSessionStore = () => {
  const store = useContext(SessionContext);
  if (!store) throw new Error('useSessionStore must be used within MobxProvider');
  return store;
};

export function MobxProvider({ children }: PropsWithChildren) {
  return <SessionContext.Provider value={sessionStore}>{children}</SessionContext.Provider>;
}
