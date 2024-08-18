// backend/types/session.d.ts
import session from 'express-session';

declare module 'express-session' {
  interface Session {
    scrapedDataIds?: string[];
  }
}
