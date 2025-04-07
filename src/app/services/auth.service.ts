import { Injectable } from '@angular/core';
import {Auth, user,User,browserSessionPersistence, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword,sendPasswordResetEmail} from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

import {setPersistence} from 'firebase/auth';
import {from, Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable <User | null>;
  googleProvider = new GoogleAuthProvider(); 


  constructor(private firebaseAuth:Auth) { 
    this.user$ = user(this.firebaseAuth);
    this.setSessionStoragePersistence
  }

  
  
  private setSessionStoragePersistence():void {
    setPersistence(this.firebaseAuth, browserSessionPersistence);
   }


   //metodo para registrar 
     // Método para registrar un usuario nuevo
  register(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {
      console.log('Usuario registrado correctamente');
    });
    return from(promise);
  }

   //metodo para el login
   login(email:string, password:string): Observable<void> {
    const promise =signInWithEmailAndPassword(this.firebaseAuth,email,password).then(()=> {
      console.log ('usuario autentificado correctamente');
    });
    return from(promise);
   }

// Método para enviar el correo de restablecimiento
  resetPassword(email: string): Observable<void> {
    const promise = sendPasswordResetEmail(this.firebaseAuth, email);
    return from(promise);
  }
   //metodo para el logout
   logout(): Observable<void>{
    const promise = signOut(this.firebaseAuth).then(()=>{
      sessionStorage.clear();
    });
    return from (promise);
   } 

   
     // Iniciar sesión con Google
     loginWithGoogle(): Observable<void> {
       const promise = signInWithPopup(this.firebaseAuth, this.googleProvider)
         .then((result) => {
           console.log('Usuario autenticado con Google:', result.user);
         })
         .catch((error) => {
           console.error('Error en autenticación con Google:', error);
         });
   
       return from(promise);
     }
}
