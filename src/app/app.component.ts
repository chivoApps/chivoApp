import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { HomePage } from "../pages/home/home";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UsuarioProvider, Credenciales } from '../providers/usuario/usuario';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;
  user: Credenciales = {};

  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private afAuth: AngularFireAuth,
              public usuarioProv: UsuarioProvider,
              private menuCtrl: MenuController,
              private fb: Facebook,
              private modalCtrl: ModalController) {

    this.pages = [
      { title: 'Inicio', component: TabsPage },
      { title: 'Acerca de', component: AboutPage}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });

  }

  signInWithFacebook() {
    
    if( this.platform.is("cordova")){

      this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', JSON.stringify(res)))
      .catch(e => console.log('Error logging into Facebook', JSON.stringify(e)));
                  
    }else{

      this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {

        console.log(JSON.stringify(res))
        let user = res.user;
        
        this.usuarioProv.cargar_usuario(
          user.displayName,
          user.email,
          user.photoURL,
          user.uid,
          "facebook"
        );

      });

    }

    this.user = this.usuarioProv.usuario;
    this.menuCtrl.close();

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  login(){
    this.modalCtrl.create(LoginPage).present();
  }

}

