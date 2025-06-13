import { makeAutoObservable } from 'mobx';

import { calculateUserTargets } from '@/lib/calculateuserTargets';
import { User, UserTargets } from '@/model/user';

export class SessionStore {
  user: User | null = null;
  targets: UserTargets | null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = {
      ...this.user,
      ...user
    };

    this.targets = calculateUserTargets(user);
  }

  clear() {
    this.user = null;
  }
}

export const sessionStore = new SessionStore();
