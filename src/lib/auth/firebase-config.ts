import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
}

const configs: Record<string, FirebaseConfig> = {
  'boyce-pro': {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_BOYCE!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_BOYCE || 'boycepro-9a6c5.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_BOYCE || 'boycepro-9a6c5',
  },
  'agentbolt': {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_AGENTBOLT!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_AGENTBOLT || 'agentbolt-ai.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_AGENTBOLT || 'agentbolt-ai',
  },
};

// Site ID should be set in your app's env vars
const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID as 'boyce-pro' | 'agentbolt';

if (!SITE_ID || !configs[SITE_ID]) {
  throw new Error(`Invalid NEXT_PUBLIC_SITE_ID: ${SITE_ID}. Must be 'boyce-pro' or 'agentbolt'`);
}

const config = configs[SITE_ID];

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(config);
} else {
  app = getApps()[0];
}

// Initialize services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const firebaseConfig = config;

// Export for easier access
export { app };