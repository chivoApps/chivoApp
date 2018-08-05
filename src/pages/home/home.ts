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
  
  public categorias: any;
  cat_busqueda = [];
  busqueda: boolean;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public db: DatabaseProvider) {

    this.busqueda = false;

    this.categorias = this.db.get_categorias().valueChanges();

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
  goToDepartments(index){
    console.log(index)
    this.navCtrl.push(DepartmentsPage);
  }

  crear_categoria(){
    this.db.crear_categoria("PRUEBA", "home");
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.categorias = this.db.get_categorias().valueChanges();
      refresher.complete();
    }, 2000);
  }

  getItems(ev: any) {

    this.cat_busqueda = []
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      //this.cat_busqueda = this.categorias.filter((item) => {
        //return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //})
    }
  }

}
