// Firebase config
export { auth, db, firebaseConfig } from './firebase-config';

// Auth context and hook
export { AuthProvider, useAuth } from './auth-context';

// Auth components
export { AuthGuard } from './auth-guard';
export { ContentGate } from './content-gate';