import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getDatabase } from "firebase/database";
export enum PRIVACY_LEVELS {
  PUBLIC,
  PRIVATE,
}
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
const app = initializeApp(config);
export function database() {
  return getDatabase(app);
}
export function storage() {
  return getStorage(app);
}

export function getRefWithPrivacyLevel(
  id: string,
  name: string,
  privacyLevel: PRIVACY_LEVELS
) {
  return ref(storage(), `${id}/${privacyLevel}/${name}`);
}
export function getPrivateRef(id: string, name: string) {
  return getRefWithPrivacyLevel(id, name, PRIVACY_LEVELS.PRIVATE);
}
export function getPublicRef(id: string, name: string) {
  return getRefWithPrivacyLevel(id, name, PRIVACY_LEVELS.PUBLIC);
}
