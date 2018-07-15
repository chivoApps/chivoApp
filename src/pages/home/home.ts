import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

//se importa la página a la que se va a acceder
import { DepartmentsPage } from "../departments/departments"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {


  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

  //funcion que va a ejecutar la pagina
  goToDepartments(){
    this.navCtrl.push(DepartmentsPage);
  }

}
