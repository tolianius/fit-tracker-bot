// src/telegram-web-app.d.ts

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id?: string;
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      is_premium?: boolean;
      photo_url?: string;
    };
    auth_date: number;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    setText(text: string): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    setParams(params: { text?: string; color?: string; text_color?: string }): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  HapticFeedback: {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
    selectionChanged(): void;
  };
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  enableVerticalSwipes(): void;
  disableVerticalSwipes(): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  close(): void;
  expand(): void;
  onEvent(eventType: string, callback: () => void): void;
  offEvent(eventType: string, callback: () => void): void;
  sendData(data: string): void;
  ready(): void;
}

interface Telegram {
  WebApp: TelegramWebApp;
}

declare global {
  interface Window {
    Telegram?: Telegram;
  }
}

export {};
