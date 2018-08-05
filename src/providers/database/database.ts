import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database/database";

import {  
  AngularFirestore } from 'angularfire2/firestore/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class DatabaseProvider {

  categoria = {
    id: null,
    categoria: null,
    icon: null
  }

  constructor(public afDB: AngularFireDatabase,
              private fireStore: AngularFirestore) {


  }

  crear_categoria(categoria, icon){
    
    this.categoria.id = this.fireStore.createId();
    this.categoria.categoria = categoria;
    this.categoria.icon = icon;

    return this.fireStore.doc("categorias/"+this.categoria.id).set(this.categoria);

  }

  get_categorias(): AngularFirestoreCollection<any>{
    return this.fireStore.collection("categorias", ref => ref.orderBy("categoria", "asc"));
  }

}
