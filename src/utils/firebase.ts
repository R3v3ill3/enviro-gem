
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth functions
export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};

// Campaign functions
export const saveCampaign = async (userId: string, campaignData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'campaigns'), {
      ...campaignData,
      userId,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving campaign:', error);
    throw error;
  }
};

// New function names to match imports
export const saveCampaignData = saveCampaign;

export const updateCampaignData = async (campaignId: string, updates: any) => {
  try {
    const campaignRef = doc(db, 'campaigns', campaignId);
    await updateDoc(campaignRef, updates);
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw error;
  }
};

export const getCampaignData = async (campaignId: string) => {
  try {
    const campaignRef = doc(db, 'campaigns', campaignId);
    const campaignSnap = await getDoc(campaignRef);
    
    if (campaignSnap.exists()) {
      return { id: campaignSnap.id, ...campaignSnap.data() };
    } else {
      throw new Error('Campaign not found');
    }
  } catch (error) {
    console.error('Error getting campaign:', error);
    throw error;
  }
};

export const getUserCampaigns = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'campaigns'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting campaigns:', error);
    throw error;
  }
};
