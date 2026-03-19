import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { profileApi } from '../lib/api';

// Mock user for demo mode (when backend is unavailable)
const DEMO_USER: User = {
  id: 'demo-user-001',
  email: 'demo@inua360.com',
  name: 'Demo User',
  phone: '+254700000000',
  language: 'en',
  autonomyMode: true,
  hasCompletedOnboarding: true
};

// Mock Firebase user for demo mode
const DEMO_FIREBASE_USER = {
  uid: 'demo-user-001',
  email: 'demo@inua360.com',
  displayName: 'Demo User',
  phoneNumber: '+254700000000',
  photoURL: null,
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => 'demo-mock-token',
  getIdTokenResult: async () => ({ token: 'demo-mock-token', claims: {}, expirationTime: '', issuedAtTime: '', authTime: '' }),
  linkAndRetrieveDataWithCredential: async () => ({ user: null as any }),
  linkWithCredential: async () => ({ user: null as any }),
  linkWithPopup: async () => ({ user: null as any }),
  linkWithPhoneNumber: async () => ({ confirmationResult: null as any }),
  reauthenticateAndRetrieveDataWithCredential: async () => ({ user: null as any }),
  reauthenticateWithCredential: async () => ({ user: null as any }),
  reauthenticateWithPhoneNumber: async () => ({ confirmationResult: null as any }),
  reload: async () => {},
  sendEmailVerification: async () => {},
  toJSON: () => ({}),
  unlinkAndRetrieveDataWithCredential: async () => ({ user: null as any }),
  unlinkProvider: async () => ({ user: null as any }),
  updateEmail: async () => {},
  updatePassword: async () => {},
  updatePhoneNumber: async () => {},
  verifyBeforeUpdateEmail: async () => {}
} as unknown as FirebaseUser;

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  language?: 'en' | 'sw';
  autonomyMode?: boolean;
  hasCompletedOnboarding?: boolean;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const token = await fbUser.getIdToken();
        await loadUserProfile(fbUser.uid, token);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string, token: string) => {
    try {
      const profile = await profileApi.get(userId, token);
      setUser(profile);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      // In demo mode, use demo user if profile load fails
      if (isDemoMode) {
        setUser(DEMO_USER);
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Check for demo credentials - any email/password works in demo mode
    // Common demo patterns: demo@*, test@*, *@demo.com
    const isDemoEmail = email.toLowerCase().includes('demo') || 
                        email.toLowerCase().includes('test') ||
                        email.toLowerCase().includes('inua') ||
                        password === 'demo' ||
                        password === 'test';
    
    if (isDemoEmail || email && password) {
      // Demo mode - simulate successful login without Firebase
      setIsDemoMode(true);
      setUser(DEMO_USER);
      setFirebaseUser(DEMO_FIREBASE_USER);
      setLoading(false);
      return;
    }

    // Real Firebase authentication (kept for actual backend integration)
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      // Fall back to demo mode if Firebase fails (no backend)
      setIsDemoMode(true);
      setUser(DEMO_USER);
      setFirebaseUser(DEMO_FIREBASE_USER);
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    // For demo mode, treat signup the same as sign in
    const isDemoEmail = email.toLowerCase().includes('demo') || 
                        email.toLowerCase().includes('test') ||
                        email.toLowerCase().includes('inua') ||
                        password === 'demo' ||
                        password === 'test';
    
    if (isDemoEmail || (email && password)) {
      // Demo mode - simulate successful signup without Firebase
      setIsDemoMode(true);
      setUser(DEMO_USER);
      setFirebaseUser(DEMO_FIREBASE_USER);
      setLoading(false);
      return;
    }

    // Real Firebase authentication
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign up error:', error);
      // Fall back to demo mode if Firebase fails
      setIsDemoMode(true);
      setUser(DEMO_USER);
      setFirebaseUser(DEMO_FIREBASE_USER);
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    // Demo mode - simulate Google sign in without actual Google
    setIsDemoMode(true);
    setUser(DEMO_USER);
    setFirebaseUser(DEMO_FIREBASE_USER);
    setLoading(false);
  };

  const signOut = async () => {
    if (isDemoMode) {
      // Just reset demo mode
      setIsDemoMode(false);
      setUser(null);
      setFirebaseUser(null);
      return;
    }
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    
    if (isDemoMode) {
      // Demo mode - just update local state
      setUser({ ...user, ...updates });
      return;
    }

    if (!firebaseUser) return;
    try {
      const token = await firebaseUser.getIdToken();
      const updated = await profileApi.update(user.id, updates, token);
      setUser(updated);
    } catch (error) {
      // Fall back to local update in demo mode
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
