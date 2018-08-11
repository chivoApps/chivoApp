import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the DepartmentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-department-detail',
  templateUrl: 'department-detail.html',
})
export class DepartmentDetailPage {

  palabras: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider) {

    this.palabras = this.db.get_palabras_depa(this.navParams.get("departamento")).valueChanges();


  }

}
