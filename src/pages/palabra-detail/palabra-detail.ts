import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PalabraDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-palabra-detail',
  templateUrl: 'palabra-detail.html',
})
export class PalabraDetailPage {

  public palabra:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.palabra = this.navParams.get("palabra");
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
