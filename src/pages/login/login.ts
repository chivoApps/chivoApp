import { Component} from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';


//login
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';

//providers
import { UsuarioProvider } from "../../providers/usuario/usuario";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public viewCtrl: ViewController, public navParams: NavParams,
              private platform: Platform, private fb: Facebook, 
              private login: AngularFireAuth, public usuarioProv: UsuarioProvider,
              private googlePlus: GooglePlus) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login_facebook(){

    if(this.platform.is("cordova")){

      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential)
              .then( user => {

                  console.log(user)
              
                  this.usuarioProv.cargar_usuario(
                    user.displayName,
                    user.email,
                    user.photoURL,
                    user.uid,
                    "facebook"
                  );
      
                  this.viewCtrl.dismiss();

              });
      })

    }else{
      this.login.auth
          .signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then( res => {

            let user = res.user;

            console.log(user)
            
            this.usuarioProv.cargar_usuario(
              user.displayName,
              user.email,
              user.photoURL,
              user.uid,
              "facebook"
            );

            this.viewCtrl.dismiss( this.usuarioProv.usuario );

          })
    }

  }

  login_google(){

    if(this.platform.is("cordova")){
      this.googlePlus.login({
        'webClientId': '326875584645-f506bmloo3jq653356temgui3g76psec.apps.googleusercontent.com',
        'offline': true
      }).then( res => {
        console.log(res);
  
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then( user => {
  
          console.log("Firebase success: " + JSON.stringify(user));
  
          this.usuarioProv.cargar_usuario(
            user.displayName,
            user.email,
            user.photoURL,
            user.uid,
            "google"
          );
  
          this.viewCtrl.dismiss( this.usuarioProv.usuario );
  
        })
          .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
      })
        .catch(err => console.error("ERROR: "+JSON.stringify(err)));

    }else{

      this.login.auth
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then( res => {

            let user = res.user;

            console.log(user)
            
            this.usuarioProv.cargar_usuario(
              user.displayName,
              user.email,
              user.photoURL,
              user.uid,
              "google"
            );

            this.viewCtrl.dismiss( this.usuarioProv.usuario );

          })

    }

  }

}
