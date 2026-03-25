export type Category = 'Games' | 'Apps' | 'Tools' | 'Modded';

export interface AndroidApp {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  downloadUrl: string;
  category: Category;
  createdAt: number;
}

export interface AdminUser {
  username: string;
  isLoggedIn: boolean;
}
