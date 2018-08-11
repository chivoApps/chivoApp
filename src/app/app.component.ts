import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { PalabrasPage } from "../pages/palabras/palabras";

import { AngularFireAuth } from 'angularfire2/auth';

import { UsuarioProvider, Credenciales } from '../providers/usuario/usuario';

import { GooglePlus } from '@ionic-native/google-plus';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;
  user: Credenciales = {};
  logueado: boolean;

  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private afAuth: AngularFireAuth,
              public usuarioProv: UsuarioProvider,
              private modalCtrl: ModalController,
              private googlePlus: GooglePlus) {

    this.pages = [
      { title: 'Inicio', component: TabsPage },
      { title: 'Acerca de', component: AboutPage },
      { title: 'Agregar Palabra', component: PalabrasPage }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.afAuth.authState.subscribe(data => {
        console.log("log state: ", data);
        if( data != null){
          this.user.imagen = data.photoURL+"?width=1024&height=1024";
          this.user.nombre = data.displayName;
          this.logueado = true;
        }else{
          this.logueado = false;
        }
  
      });

    });

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  login(){
    let modal = this.modalCtrl.create(LoginPage)
    modal.present();

    modal.onDidDismiss( data => {
      console.log(data);
      
      if(data !=null){
        this.user = data;
      }

    });
  }

  cerrar_sesion(){
    this.afAuth.auth.signOut().then(res => {
      this.usuarioProv.usuario = {}
      this.googlePlus.disconnect();
    });
  }

}

