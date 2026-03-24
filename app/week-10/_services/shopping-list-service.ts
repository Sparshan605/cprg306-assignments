import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export async function GetItems(userId: string) {
  const items: Item[] = [];
  const querySnapshot = await getDocs(collection(db, "users", userId, "items"));
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...(doc.data() as Omit<Item, "id">) });
  });
  return items;
}

export async function AddItem(userId: string, item: Omit<Item, "id">) {
  const docRef = await addDoc(collection(db, "users", userId, "items"), item);
  return docRef.id;
}