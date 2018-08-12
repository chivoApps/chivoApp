import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { CategoriasPage } from '../categorias/categorias';

/**
 * Generated class for the CategoriasListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias-list',
  templateUrl: 'categorias-list.html',
})
export class CategoriasListPage {

  public categorias: any;

  constructor(public db: DatabaseProvider,
  				public modalCtrl: ModalController) {
  
    this.categorias = this.db.get_categorias().valueChanges();

  }

    //funcion que va a ejecutar la pagina
    goToCategory(categoria){
      console.log(categoria)
      //this.navCtrl.push();
    }
  
    crear_categoria(){
	  this.modalCtrl.create(CategoriasPage).present();
    }


  doRefresh(refresher) {
    setTimeout(() => {
      this.categorias = this.db.get_categorias().valueChanges();
      refresher.complete();
    }, 2000);
  }

  modificar(){
	  this.db.edit_usuarios();
  }

}
