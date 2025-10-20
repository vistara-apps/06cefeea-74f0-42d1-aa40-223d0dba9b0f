import type { UserPortfolio } from './types';

const STORAGE_KEY = 'minifolio_portfolio';

export function savePortfolio(portfolio: UserPortfolio): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
  } catch (error) {
    console.error('Error saving portfolio:', error);
  }
}

export function loadPortfolio(): UserPortfolio | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading portfolio:', error);
    return null;
  }
}

export function clearPortfolio(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing portfolio:', error);
  }
}
