import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const productsCollection = collection(db, 'products');
const ordersCollection = collection(db, 'orders');

function normalizeProduct(docSnapshot) {
  const data = docSnapshot.data();

  return {
    id: docSnapshot.id,
    name: data.name ?? data.title ?? 'Producto sin nombre',
    description: data.description ?? '',
    category: data.category ?? 'general',
    price: Number(data.price ?? 0),
    stock: Number(data.stock ?? 0),
    image:
      data.image ??
      data.imageUrl ??
      'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=900&q=80',
  };
}

export async function getProducts(categoryId) {
  const productsQuery = categoryId
    ? query(productsCollection, where('category', '==', categoryId))
    : productsCollection;
  const snapshot = await getDocs(productsQuery);

  return snapshot.docs.map(normalizeProduct);
}

export async function getProductById(productId) {
  const productRef = doc(db, 'products', productId);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  return normalizeProduct(snapshot);
}

export async function getCategories() {
  const snapshot = await getDocs(productsCollection);
  const categories = snapshot.docs
    .map((productDoc) => productDoc.data().category)
    .filter(Boolean);

  return [...new Set(categories)];
}

export async function createOrder(order) {
  const orderToSave = {
    ...order,
    createdAt: Timestamp.fromDate(new Date()),
  };
  const orderRef = await addDoc(ordersCollection, orderToSave);

  return orderRef.id;
}
