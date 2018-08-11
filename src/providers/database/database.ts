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

  palabra = {
    id:  null,
    palabra: null,
    definicion: null,
    ejemplos: null,
    categorias: null,
    departamentos: null
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

  add_palabra(data){

    this.palabra.id = this.fireStore.createId();
    this.palabra.palabra = data.palabra.toLowerCase();
    this.palabra.ejemplos = data.ejemplos;
    this.palabra.departamentos = data.departamentos;
    this.palabra.definicion = data.definicion;
    this.palabra.categorias = data.categorias;

    return this.fireStore.doc("diccionario/"+this.palabra.id).set(this.palabra);

  }

  search(param){
    const end = param.toLowerCase() + '\uf8ff';
    return this.fireStore.collection("diccionario", ref => 
      ref.orderBy('palabra')
      .limit(5)
      .startAt(param.toLowerCase())
      .endAt(end))
  }

  get_palabras_depa(depa){
    return this.fireStore.collection("diccionario", ref => ref.where("departamentos", "array-contains", depa));
  }

}
