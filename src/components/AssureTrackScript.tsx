'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    EF?: {
      urlParameter: (param: string) => string | null;
      click: (params: Record<string, string | number | null | undefined>) => Promise<string>;
      getTransactionId: (offerId: number | string) => string;
      getAdvertiserTransactionId?: (advertiserId: number | string) => string;
    };
    __ef_click_fired__?: boolean;
  }
}

function setCookie(name: string, value: string, days: number = 30): void {
  if (typeof window === 'undefined') return;
  
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  const cookieString = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax${secure}`;
  
  document.cookie = cookieString;
  console.log(`AssureTrack: Cookie set - ${name}=${value}`);
}

export default function AssureTrackScript() {
  useEffect(() => {
    // Prevent double-fire in React Strict Mode dev
    if (typeof window === 'undefined') return;
    if (window.__ef_click_fired__) {
      console.log('AssureTrack: Already fired, skipping');
      return;
    }
    window.__ef_click_fired__ = true;

    // Poll until EF SDK is available
    const poll = setInterval(() => {
      if (!window.EF?.click) {
        return;
      }

      clearInterval(poll);

      const EF = window.EF;

      // Configuration - these are your fixed values
      const OFFER_ID = 2015;
      const AFFILIATE_ID = 1;

      // Check if this is ITP/Redirect mode (transaction_id in URL)
      const tidFromUrl = 
        EF.urlParameter('_ef_transaction_id') || 
        EF.urlParameter('transaction_id') || 
        '';

      // Check if user already has a transaction ID for this offer
      const existingTid = EF.getTransactionId(OFFER_ID);
      
      if (existingTid && existingTid.trim() !== '') {
        // User already has a transaction ID - store it in our cookie and skip new click
        console.log('AssureTrack: Existing transaction ID found:', existingTid);
        setCookie('ef_tid', existingTid, 30);
        return;
      }

      // Build params object
      const params: Record<string, string | number | null | undefined> = {
        offer_id: OFFER_ID,
        affiliate_id: AFFILIATE_ID,
        sub1: 'organic',
        sub2: 'main_page_redirect',
      };

      // Add optional URL parameters if present
      const sourceId = EF.urlParameter('source_id');
      if (sourceId) params.source_id = sourceId;
      
      const sub3 = EF.urlParameter('sub3');
      if (sub3) params.sub3 = sub3;
      
      const sub4 = EF.urlParameter('sub4');
      if (sub4) params.sub4 = sub4;
      
      const sub5 = EF.urlParameter('sub5');
      if (sub5) params.sub5 = sub5;
      
      const uid = EF.urlParameter('uid');
      if (uid) params.uid = uid;

      // If transaction_id came from URL (ITP/Redirect mode), include it
      // This is for the ITP workaround - first-party cookie tracking
      if (tidFromUrl) {
        params.transaction_id = tidFromUrl;
        console.log('AssureTrack: ITP/Redirect mode - passing transaction_id from URL:', tidFromUrl);
      } else {
        console.log('AssureTrack: Direct Linking mode - Everflow will generate transaction ID');
      }

      console.log('AssureTrack: Calling EF.click with params:', params);

      // Call EF.click() - it returns a Promise that resolves with the transaction ID
      // Reference: https://developers.everflow.io/docs/everflow-sdk/click_tracking/#advanced-use
      EF.click(params)
        .then((transactionId: string) => {
          console.log('AssureTrack: EF.click Promise resolved with transaction ID:', transactionId);
          
          if (transactionId && transactionId.trim() !== '') {
            // Store the Everflow-generated transaction ID
            setCookie('ef_tid', transactionId, 30);
            console.log('AssureTrack: Transaction ID stored successfully:', transactionId);
          } else {
            // Promise resolved but no TID - try getTransactionId as fallback
            console.warn('AssureTrack: Promise resolved but transaction ID is empty');
            extractAndStoreTid(EF, OFFER_ID);
          }
        })
        .catch((error: unknown) => {
          console.error('AssureTrack: EF.click Promise rejected:', error);
          // Try to extract transaction ID anyway
          extractAndStoreTid(EF, OFFER_ID);
        });

      // Fallback: Also try to extract after a delay in case Promise doesn't work
      setTimeout(() => {
        const cookieExists = document.cookie.includes('ef_tid=');
        if (!cookieExists) {
          console.log('AssureTrack: Fallback - checking getTransactionId after delay');
          extractAndStoreTid(EF, OFFER_ID);
        }
      }, 2000);

    }, 100);

    // Cleanup
    return () => {
      clearInterval(poll);
    };
  }, []);

  return null;
}
/**
 * Extract transaction ID using EF.getTransactionId and store in cookie
 * Reference: https://developers.everflow.io/docs/everflow-sdk/click_tracking/#extracting-the-transaction-id
 */
function extractAndStoreTid(EF: NonNullable<typeof window.EF>, offerId: number): void {
  try {
    const tid = EF.getTransactionId(offerId);
    if (tid && tid.trim() !== '') {
      setCookie('ef_tid', tid, 30);
      console.log('AssureTrack: Transaction ID extracted via getTransactionId:', tid);
    } else {
      console.warn('AssureTrack: getTransactionId returned empty for offer:', offerId);
    }
  } catch (err) {
    console.error('AssureTrack: Error calling getTransactionId:', err);
  }
}

