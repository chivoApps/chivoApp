import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from "../pages/tabs/tabs";


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UsuarioProvider, Credenciales } from '../providers/usuario/usuario';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TabsPage;
  user: Credenciales = {};
  logueado: boolean = false;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private afAuth: AngularFireAuth,
              public usuarioProv: UsuarioProvider,
              private menuCtrl: MenuController,
              private fb: Facebook) {

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
      .then((res: FacebookLoginResponse) => 
        console.log('Logged into Facebook!', res)
      )
      .catch(e => console.log('Error logging into Facebook', e));

    }else{

      this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
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
    this.logueado = true;
    this.menuCtrl.close();

  }

}

