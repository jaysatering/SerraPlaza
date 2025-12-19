/**
 * Meta Pixel TypeScript Declarations
 */

declare global {
  interface Window {
    fbq: FacebookPixel;
    _fbq: FacebookPixel;
  }
}

interface FacebookPixel {
  (command: 'track', eventName: string, parameters?: Record<string, any>): void;
  (command: 'trackCustom', eventName: string, parameters?: Record<string, any>): void;
  (command: 'init', pixelId: string, userData?: Record<string, any>): void;
  callMethod?: (...args: any[]) => void;
  queue?: any[];
  push?: (args: any[]) => void;
  loaded?: boolean;
  version?: string;
}

export {};
