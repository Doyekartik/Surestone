import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

const configured = firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith('PASTE_') &&
  firebaseConfig.projectId && !firebaseConfig.projectId.startsWith('PASTE_') &&
  firebaseConfig.appId && !firebaseConfig.appId.startsWith('PASTE_');

if (!configured) {
  window.sureStoneAuth = {
    configured: false,
    async signIn() { throw new Error('Firebase is not configured yet. Add your Firebase web app settings to firebase-config.js.'); },
    async signInEmail() { throw new Error('Firebase is not configured yet.'); },
    async createEmailAccount() { throw new Error('Firebase is not configured yet.'); },
    async sendPhoneCode() { throw new Error('Firebase is not configured yet.'); },
    async confirmPhoneCode() { throw new Error('Firebase is not configured yet.'); },
    clearPhoneVerifier() {},
    async signOut() {}
  };
  document.dispatchEvent(new CustomEvent('surestone-auth-ready'));
} else {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  let phoneVerifier = null;
  let phoneConfirmation = null;
  provider.setCustomParameters({ prompt: 'select_account' });

  window.sureStoneAuth = {
    configured: true,
    async signIn() {
      // Firebase recommends redirect sign-in on mobile; desktop uses a popup.
      if (matchMedia('(max-width: 700px)').matches) return signInWithRedirect(auth, provider);
      try { return await signInWithPopup(auth, provider); }
      catch (error) {
        if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
          return signInWithRedirect(auth, provider);
        }
        throw error;
      }
    },
    signInEmail: (email, password) => signInWithEmailAndPassword(auth, email, password),
    async createEmailAccount(name, email, password) {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(credential.user, { displayName: name });
      return credential;
    },
    async sendPhoneCode(phone, containerId) {
      if (phoneVerifier) phoneVerifier.clear();
      phoneVerifier = new RecaptchaVerifier(auth, containerId, { size: 'normal' });
      phoneConfirmation = await signInWithPhoneNumber(auth, phone, phoneVerifier);
      return phoneConfirmation;
    },
    async confirmPhoneCode(code) {
      if (!phoneConfirmation) throw new Error('Request a verification code first.');
      const result = await phoneConfirmation.confirm(code);
      phoneConfirmation = null;
      return result;
    },
    clearPhoneVerifier() {
      if (phoneVerifier) phoneVerifier.clear();
      phoneVerifier = null;
      phoneConfirmation = null;
    },
    signOut: () => signOut(auth)
  };

  getRedirectResult(auth).catch(error => {
    document.dispatchEvent(new CustomEvent('surestone-auth-error', { detail: error }));
  });
  onAuthStateChanged(auth, user => {
    document.dispatchEvent(new CustomEvent('surestone-auth-state', { detail: user ? {
      uid: user.uid, name: user.displayName || '', email: user.email || '',
      phone: user.phoneNumber || '', photoURL: user.photoURL || ''
    } : null }));
  });
  document.dispatchEvent(new CustomEvent('surestone-auth-ready'));
}
