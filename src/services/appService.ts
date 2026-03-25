import { AndroidApp, Category } from '../types';

const STORAGE_KEY = 'eagle_store_apps';

const DEFAULT_APPS: AndroidApp[] = [
  {
    id: '1',
    name: 'WhatsApp Messenger',
    description: 'Simple. Reliable. Private. WhatsApp from Meta is a FREE messaging and video calling app.',
    imageUrl: 'https://picsum.photos/seed/whatsapp/200/200',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.whatsapp',
    category: 'Apps',
    createdAt: Date.now(),
  },
  {
    id: '2',
    name: 'PUBG MOBILE',
    description: 'The original battle royale mobile game and one of the best mobile shooting games.',
    imageUrl: 'https://picsum.photos/seed/pubg/200/200',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.tencent.ig',
    category: 'Games',
    createdAt: Date.now(),
  },
  {
    id: '3',
    name: 'Spotify: Music and Podcasts',
    description: 'With Spotify, you can listen to music and play millions of songs and podcasts for free.',
    imageUrl: 'https://picsum.photos/seed/spotify/200/200',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.spotify.music',
    category: 'Apps',
    createdAt: Date.now(),
  },
  {
    id: '4',
    name: 'ES File Explorer',
    description: 'A powerful file manager for Android with many advanced features.',
    imageUrl: 'https://picsum.photos/seed/esfile/200/200',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.estrongs.android.pop',
    category: 'Tools',
    createdAt: Date.now(),
  },
];

export const appService = {
  getApps: (): AndroidApp[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_APPS));
      return DEFAULT_APPS;
    }
    return JSON.parse(stored);
  },

  addApp: (app: Omit<AndroidApp, 'id' | 'createdAt'>): AndroidApp => {
    const apps = appService.getApps();
    const newApp: AndroidApp = {
      ...app,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    const updated = [newApp, ...apps];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newApp;
  },

  updateApp: (id: string, updates: Partial<AndroidApp>): AndroidApp | null => {
    const apps = appService.getApps();
    const index = apps.findIndex(a => a.id === id);
    if (index === -1) return null;

    const updatedApp = { ...apps[index], ...updates };
    apps[index] = updatedApp;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    return updatedApp;
  },

  deleteApp: (id: string): void => {
    const apps = appService.getApps();
    const updated = apps.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
};
