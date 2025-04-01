import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc, query, where } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private db: Firestore = inject(Firestore);

  getProducts() {
    const productsCollection = collection(this.db, 'products');
    return collectionData(productsCollection, { idField: 'id' }).pipe(first());
  }

  getProductsByProvider(providerId: string) {
    const productsCollection = collection(this.db, 'products');
    const q = query(productsCollection, where('providerId', '==', providerId));
    return collectionData(q, { idField: 'id' }).pipe(first());
  }

  addProduct(product: Product) {
    const productsCollection = collection(this.db, 'products');
    return addDoc(productsCollection, {
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      cantidad: product.cantidad,
      providerId: product.providerId
    });
  }

  updateProduct(product: Product) {
    const documentRef = doc(this.db, 'products', product.id);
    return updateDoc(documentRef, {
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      cantidad: product.cantidad,
      providerId: product.providerId
    });
  }

  deleteProduct(product: Product) {
    const documentRef = doc(this.db, 'products', product.id);
    return deleteDoc(documentRef);
  }
}
