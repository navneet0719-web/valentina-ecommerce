import { SITE_CONFIG } from '../config/site';

export type AnalyticsEventName =
  | 'page_view'
  | 'view_item'
  | 'search'
  | 'filter_catalog'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'add_to_wishlist'
  | 'remove_from_wishlist'
  | 'begin_checkout'
  | 'demo_purchase_complete';

export interface AnalyticsEventRecord {
  id: string;
  timestamp: string;
  event: AnalyticsEventName;
  payload: Record<string, unknown>;
  consentGranted: boolean;
  environment: 'demo_sandbox';
}

const STORAGE_CONSENT_KEY = 'valentina_marketing_consent_v1';
let eventLog: AnalyticsEventRecord[] = [];
const listeners: Array<() => void> = [];

export function getMarketingConsent(): boolean {
  try {
    return localStorage.getItem(STORAGE_CONSENT_KEY) === 'granted';
  } catch {
    return false;
  }
}

export function setMarketingConsent(granted: boolean): void {
  try {
    localStorage.setItem(STORAGE_CONSENT_KEY, granted ? 'granted' : 'declined');
    notifyListeners();
  } catch {
    // Ignore storage errors
  }
}

export function getAnalyticsEventLog(): AnalyticsEventRecord[] {
  return eventLog;
}

export function subscribeAnalytics(listener: () => void): () => void {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

export function trackEvent(
  event: AnalyticsEventName,
  payload: Record<string, unknown> = {}
): void {
  const consentGranted = getMarketingConsent();
  const record: AnalyticsEventRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    event,
    payload: {
      ...payload,
      currency: SITE_CONFIG.currency,
      is_demo_environment: true,
    },
    consentGranted,
    environment: 'demo_sandbox',
  };

  eventLog = [record, ...eventLog.slice(0, 49)];
  notifyListeners();

  // Integration hook for Google Tag Manager / GA4 dataLayer when configured & consented
  if (
    typeof window !== 'undefined' &&
    consentGranted &&
    SITE_CONFIG.analytics.trackingActive
  ) {
    const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      event,
      ...record.payload,
    });
  }
}
