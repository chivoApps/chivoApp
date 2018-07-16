import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database/database";

@Injectable()
export class DatabaseProvider {

  constructor(public afDB: AngularFireDatabase) {

  }

  crear_categoria(categoria){
    this.afDB.database.ref("/categorias/"+categoria.id).set(categoria);
  }

  get_categorias(){
    return this.afDB.list("/categorias/");
  }

}
