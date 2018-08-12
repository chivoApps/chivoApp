import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

//se importa la página a la que se va a acceder
import { DepartmentsPage } from "../departments/departments"
import { PalabraDetailPage } from '../palabra-detail/palabra-detail';

//datbase
import { DatabaseProvider } from "../../providers/database/database";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //es es la variable que se llama desde [navPush]
  departments:any = DepartmentsPage;
  
  cat_busqueda = [];
  busqueda: boolean;
  search: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
              public db: DatabaseProvider) {

    this.busqueda = false;

    

  }

  getItems(ev: any) {

    this.cat_busqueda = []
    // set val to the value of the searchbar
    const start = ev.target.value;

    // if the value is an empty string don't filter the items
    if (start && start.trim() != '') {
      //this.cat_busqueda = this.categorias.filter((item) => {
        //return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //})
      this.search = this.db.search(start).valueChanges();
    }else{
      this.search = null;
    }
  }

  open_definicion(data){
    console.log(data);

    const ops = {
      "showBackdrop": true
    }

    this.modalCtrl.create(PalabraDetailPage, { palabra: data }, ops).present();

  }

}
