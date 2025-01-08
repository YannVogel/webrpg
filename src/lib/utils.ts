import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  let i = shuffled.length - 1;

  while (i > 0) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    i--;
  }

  return shuffled;
};
