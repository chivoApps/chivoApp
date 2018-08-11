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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _FB: FormBuilder, public db: DatabaseProvider) {

                this.form = this._FB.group({
                  palabra       	  : ['', Validators.required],
                  definicion        : ['', Validators.required],
                  ejemplos     : this._FB.array([
                     this.initTechnologyFields()
                  ]),
                  departamentos: ['', Validators.required],
                  categorias: ['', Validators.required]
               });

               this.categorias = this.db.get_categorias().valueChanges();

  }

  initTechnologyFields() : FormGroup
  {
     return this._FB.group({
        ejemplo 		: ['', Validators.required]
     });
  }



  /**
   * Programmatically generates a new technology input field
   *
   * @public
   * @method addNewInputField
   * @return {none}
   */
  addNewInputField() : void
  {
     const control = <FormArray>this.form.controls.ejemplos;
     control.push(this.initTechnologyFields());
  }



  /**
   * Programmatically removes a recently generated technology input field
   *
   * @public
   * @method removeInputField
   * @param i    {number}      The position of the object in the array that needs to removed
   * @return {none}
   */
  removeInputField(i : number) : void
  {
     const control = <FormArray>this.form.controls.ejemplos;
     control.removeAt(i);
  }



  /**
   * Receive the submitted form data
   *
   * @public
   * @method manage
   * @param val    {object}      The posted form data
   * @return {none}
   */
  manage(val : any) : void
  {
     console.dir(val);
     this.db.add_palabra(val);
  }


}
