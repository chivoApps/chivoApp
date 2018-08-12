import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  public form: FormGroup;
  public user: string;

  constructor(private _FB: FormBuilder, public viewCtrl: ViewController,
              public db: DatabaseProvider, private auth: AngularFireAuth) {

    this.form = this._FB.group({
      categoria       	  : ['', Validators.required],
      descripcion        : ['', Validators.required]
   });

   this.auth.user.subscribe( user => {
      this.user = user.displayName;
   });

  }

  agregar(val : any) : void{ 
    this.db.crear_categoria(val.categoria, val.descripcion,this.user ,"pricetags");
    this.viewCtrl.dismiss();
  }

  close(){
	  this.viewCtrl.dismiss();
  }


}
