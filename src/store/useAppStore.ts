import { useSyncExternalStore } from 'react';
import { NavigationRoute, LanguageCode } from '../types';

export interface AppState {
  currentRoute: NavigationRoute;
  theme: 'dark' | 'light';
  language: LanguageCode;
  commandPaletteOpen: boolean;
  assistantOpen: boolean;
  activePreset: string;
  selectedIndustryId: string | null;
  selectedBenchmarkId: string | null;
}

let state: AppState = {
  currentRoute: 'home',
  theme: 'dark',
  language: 'en',
  commandPaletteOpen: false,
  assistantOpen: false,
  activePreset: 'cylinder_karman',
  selectedIndustryId: null,
  selectedBenchmarkId: null,
};

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export const store = {
  getState: () => state,
  
  setState: (updater: Partial<AppState> | ((prev: AppState) => Partial<AppState>)) => {
    const nextUpdates = typeof updater === 'function' ? updater(state) : updater;
    state = { ...state, ...nextUpdates };
    emitChange();
  },

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useAppStore<T = AppState>(selector?: (s: AppState) => T): T & {
  setRoute: (route: NavigationRoute) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  setLanguage: (lang: LanguageCode) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setAssistantOpen: (open: boolean) => void;
  toggleAssistant: () => void;
  setActivePreset: (preset: string) => void;
  setSelectedIndustryId: (id: string | null) => void;
  setSelectedBenchmarkId: (id: string | null) => void;
} {
  const currentState = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const selected = selector ? selector(currentState) : (currentState as unknown as T);

  return {
    ...(selected as any),
    setRoute: (route: NavigationRoute) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      store.setState({ currentRoute: route });
    },

    setTheme: (theme: 'dark' | 'light') => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      store.setState({ theme });
    },

    toggleTheme: () => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      store.setState({ theme: nextTheme });
    },

    setLanguage: (language: LanguageCode) => store.setState({ language }),
    setCommandPaletteOpen: (open: boolean) => store.setState({ commandPaletteOpen: open }),
    toggleCommandPalette: () => store.setState((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
    setAssistantOpen: (open: boolean) => store.setState({ assistantOpen: open }),
    toggleAssistant: () => store.setState((s) => ({ assistantOpen: !s.assistantOpen })),
    setActivePreset: (preset: string) => store.setState({ activePreset: preset }),
    setSelectedIndustryId: (id: string | null) => store.setState({ selectedIndustryId: id }),
    setSelectedBenchmarkId: (id: string | null) => store.setState({ selectedBenchmarkId: id }),
  };
}
