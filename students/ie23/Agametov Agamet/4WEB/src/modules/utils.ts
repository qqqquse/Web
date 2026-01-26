import { VKUser } from './types.js';

export function getUserPhoto(user: VKUser): string {
  return user.photo_200 || 
         user.photo_400_orig || 
         user.photo_max_orig || 
         'https://via.placeholder.com/400x400?text=Нет+фото';
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}