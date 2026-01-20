import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getCookie(name: string): string {
  if (typeof window === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift() || '';
    // Decode URI component in case it was encoded
    try {
      return decodeURIComponent(cookieValue);
    } catch {
      return cookieValue;
    }
  }
  return '';
}

export function getTransactionId(): string {
  if (typeof window === 'undefined') return '';
  
  // Read from cookie (stored by AssureTrackScript)
  // Cookie name is 'ef_tid' as set by the new implementation
  return getCookie('ef_tid') || '';
}

export function buildInsuranceUrl(baseUrl: string): string {
  if (typeof window === 'undefined') {
    return baseUrl;
  }

  const transactionId = getTransactionId();
  
  if (!transactionId) {
    return baseUrl;
  }

  const params = new URLSearchParams();
  params.append('utm_id', transactionId);
  params.append('utm_s1', 'main_page_redirect');
  params.append('utm_medium', 'email');

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
