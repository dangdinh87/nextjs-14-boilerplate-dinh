import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPhotoURL(photo: any, size: 'md' | 'sm' = 'sm') {
  if (!photo?.dimensions?.[size]) return '';
  return photo.dimensions[size].url;
}
