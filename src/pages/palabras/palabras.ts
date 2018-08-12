import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-palabras',
  templateUrl: 'palabras.html',
})
export class PalabrasPage {

  public form: FormGroup;
  public departaments = [
    "San Miguel", "La Unión", "Morazán", "Usulután", "San Salvador", "Cuscatlán",
    "La Libertad", "Chalatenango", "San Vicente", "La Paz", "Cabañas", "Santa Ana", 
    "Ahuachapán", "Sonsonate"
  ];

  public categorias: any;
  public nombre_usuario: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _FB: FormBuilder, public db: DatabaseProvider) {

                this.form = this._FB.group({
                  palabra       	  : ['', Validators.required],
                  definicion        : ['', Validators.required],
                  ejemplos     : this._FB.array([
                     this.crearEjemplo()
                  ]),
                  departamentos: ['', Validators.required],
                  categorias: ['', Validators.required]
               });

              this.categorias = this.db.get_categorias().valueChanges();
  }

  crearEjemplo() : FormGroup
  {
     return this._FB.group({
        ejemplo 		: ['', Validators.required]
     });
  }



  agregarNuevoEjemplo() : void
  {
     const control = <FormArray>this.form.controls.ejemplos;
     control.push(this.crearEjemplo());
  }



  removerEjemplo(i : number) : void
  {
     const control = <FormArray>this.form.controls.ejemplos;
     control.removeAt(i);
  }


  agregar(val : any) : void
  { 
    this.db.add_palabra(val, this.navParams.get("usuario"));
    this.form.reset();
  }


}
