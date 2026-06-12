// src/lib/storageHelpers.ts
// Utility for fetching image URLs from Firebase Storage

import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";

export async function getStorageImageUrl(path: string): Promise<string> {
  const imageRef = ref(storage, path);
  return getDownloadURL(imageRef);
}

export async function listStorageImages(folder: string): Promise<string[]> {
  const folderRef = ref(storage, folder);
  const result = await listAll(folderRef);
  const urls = await Promise.all(result.items.map((item) => getDownloadURL(item)));
  return urls;
}
