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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    DepartmentsPage //se deben de importar las pagina aqui
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    DepartmentsPage //se deben de importar las pagina aqui
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
