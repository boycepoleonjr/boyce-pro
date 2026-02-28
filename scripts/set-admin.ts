#!/usr/bin/env npx tsx

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Get service account key path from environment
const serviceAccountKeyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKeyPath) {
  console.error('❌ FIREBASE_SERVICE_ACCOUNT_KEY environment variable is required');
  console.error('   Set it to the path of your Firebase service account JSON file');
  process.exit(1);
}

// Get emails from command line arguments
const emails = process.argv.slice(2);

if (emails.length === 0) {
  console.error('❌ Please provide at least one email address');
  console.error('   Usage: npx tsx scripts/set-admin.ts admin@agentbolt.ai boyce@agentbolt.ai');
  process.exit(1);
}

// Validate emails
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
for (const email of emails) {
  if (!emailRegex.test(email)) {
    console.error(`❌ Invalid email format: ${email}`);
    process.exit(1);
  }
}

async function setAdminRole() {
  try {
    // Initialize Firebase Admin
    if (getApps().length === 0) {
      initializeApp({
        credential: cert(serviceAccountKeyPath!),
      });
    }

    const auth = getAuth();
    const db = getFirestore();

    console.log('🔧 Setting admin role for users...\n');

    for (const email of emails) {
      try {
        // Get user by email
        let userRecord;
        try {
          userRecord = await auth.getUserByEmail(email);
        } catch (error: any) {
          console.log(`⚠️  User ${email} not found in Firebase Auth`);
          console.log(`   They need to sign in at least once before setting admin role`);
          continue;
        }

        // Set custom claims
        await auth.setCustomUserClaims(userRecord.uid, {
          role: 'admin'
        });

        // Update Firestore user document
        await db.collection('users').doc(userRecord.uid).set({
          email: email,
          role: 'admin',
          updatedAt: new Date(),
        }, { merge: true });

        console.log(`✅ ${email} (${userRecord.uid}) is now an admin`);
      } catch (error: any) {
        console.error(`❌ Error setting admin role for ${email}:`, error);
      }
    }

    console.log('\n🎉 Admin setup complete!');
    console.log('\nNote: Users may need to sign out and sign back in for changes to take effect.');
    
  } catch (error: any) {
    console.error('❌ Error initializing Firebase Admin:', error);
    
    if (error.code === 'ENOENT') {
      console.error('\n💡 Make sure the service account key file exists at the specified path:');
      console.error(`   ${serviceAccountKeyPath}`);
    }
    
    process.exit(1);
  }
}

setAdminRole();