import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

//menus
import { TabsPage } from "../pages/tabs/tabs";

//paginas
import { HomePage } from '../pages/home/home';
import { DepartmentsPage } from "../pages/departments/departments"
import { LoginPage } from "../pages/login/login";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DatabaseProvider } from '../providers/database/database';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AboutPage } from '../pages/about/about';

export const firebaseConfig = {
  apiKey: "AIzaSyAQR0lmoWFN2PThw0QnuIzjsKMwcQAgClg",
  authDomain: "chivoapp.firebaseapp.com",
  databaseURL: "https://chivoapp.firebaseio.com",
  storageBucket: "chivoapp.appspot.com",
  messagingSenderId: '326875584645'
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    DepartmentsPage, //se deben de importar las pagina aqui
    LoginPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    DepartmentsPage, //se deben de importar las pagina aqui
    LoginPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    AngularFireDatabase,
    UsuarioProvider,
    Facebook,
    GooglePlus
  ]
})
export class AppModule {}
