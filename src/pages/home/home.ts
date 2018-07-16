import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

//se importa la página a la que se va a acceder
import { DepartmentsPage } from "../departments/departments"

//datbase
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //es es la variable que se llama desde [navPush]
  departments:any = DepartmentsPage;
  categorias = []

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public db: DatabaseProvider) {

    this.db.get_categorias().valueChanges().subscribe(
      cats =>{
        this.categorias = cats;
      }
    );

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

  crear_categoria(){

    let categoria = {
      id: Date.now(),
      nombre: "CATEGORIA DE PRUEBA"
    };

    this.db.crear_categoria(categoria);
  }

}
