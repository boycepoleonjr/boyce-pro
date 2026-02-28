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
const SITE_ID = (process.env.NEXT_PUBLIC_SITE_ID || 'boyce-pro') as 'boyce-pro' | 'agentbolt';

const config = configs[SITE_ID] || configs['boyce-pro'];

// Only initialize Firebase on the client (avoid SSG/build-time errors)
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

if (typeof window !== 'undefined') {
  if (getApps().length === 0) {
    app = initializeApp(config);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };
export const firebaseConfig = config;