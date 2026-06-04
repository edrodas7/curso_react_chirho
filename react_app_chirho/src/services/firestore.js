import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

export function getProducts(categoryId) {
  const productsRef = collection(db, 'products');
  const q = categoryId
    ? query(productsRef, where('category', '==', categoryId))
    : productsRef;

  return getDocs(q).then((snapshot) => {
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
}

export function getProductById(productId) {
  const productRef = doc(db, 'products', productId);

  return getDoc(productRef).then((snapshot) => {
    if (!snapshot.exists()) {
      return null;
    }
    return { id: snapshot.id, ...snapshot.data() };
  });
}

export function createOrder(order) {
  const ordersRef = collection(db, 'orders');
  const orderToSave = { ...order, date: new Date() };

  return addDoc(ordersRef, orderToSave).then((docRef) => docRef.id);
}
