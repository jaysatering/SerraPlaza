declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (config: {
          portalId: string;
          formId: string;
          region: string;
          target?: string;
          onFormSubmit?: () => void;
        }) => void;
      };
    };
    fbq: (action: string, event: string, params?: Record<string, unknown>) => void;
    gtag: (command: string, targetOrAction: string, params?: Record<string, unknown>) => void;
    dataLayer: unknown[];
  }
}

export {};