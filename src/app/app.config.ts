import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-ecb74","appId":"1:778799504260:web:d8fdbf91a0aa70a79b1bd1","storageBucket":"ring-of-fire-ecb74.appspot.com","apiKey":"AIzaSyBc7ukxaxeuUqLMnRQ-xcuaqQJS8HokR6w","authDomain":"ring-of-fire-ecb74.firebaseapp.com","messagingSenderId":"778799504260"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
