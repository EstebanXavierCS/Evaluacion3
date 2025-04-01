import { Injectable, inject } from '@angular/core';
import { Provider } from '../models/provider.model';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private db: Firestore = inject(Firestore);

  getProviders() {
    const providersCollection = collection(this.db, 'providers');
    return collectionData(providersCollection, { idField: 'id' }).pipe(first());
  }

  addProvider(provider: Provider) {
    const providersCollection = collection(this.db, 'providers');
    return addDoc(providersCollection, {
      nombre: provider.nombre,
      email: provider.email,
      telefono: provider.telefono,
      direccion: provider.direccion,
      activo: provider.activo
    });
  }

  updateProvider(provider: Provider) {
    const documentRef = doc(this.db, 'providers', provider.id);
    return updateDoc(documentRef, {
      nombre: provider.nombre,
      email: provider.email,
      telefono: provider.telefono,
      direccion: provider.direccion,
      activo: provider.activo
    });
  }

  deleteProvider(provider: Provider) {
    const documentRef = doc(this.db, 'providers', provider.id);
    return deleteDoc(documentRef);
  }
}
