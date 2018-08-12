import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database/database";
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { MessageProvider } from "../../providers/message/message";

export interface User{
  id?: string,
  nombre?: string,
  uid?: string
}

@Injectable()
export class DatabaseProvider {

  categoria = {
    id: null,
    categoria: null,
    icon: null,
    usuario: null,
    descripcion: null
  }

  palabra = {
    id:  null,
    palabra: null,
    definicion: null,
    ejemplos: null,
    categorias: null,
    departamentos: null,
    usuario: null
  }

  usuarios: User[];

  constructor(public afDB: AngularFireDatabase,
              private fireStore: AngularFirestore,
              private message: MessageProvider) {


  }

  crear_categoria(categoria, descripcion, user,icon){
    
    this.categoria.id = this.fireStore.createId();
    this.categoria.categoria = categoria;
    this.categoria.icon = icon;
    this.categoria.usuario = user;
    this.categoria.descripcion = descripcion;

    this.fireStore.doc("categorias/"+this.categoria.id).set(this.categoria)
        .then(() => {
          this.message.show("¡Éxito!", "Se ha agregado la categoría exitosamente.");
        })
        .catch( er => {
          this.message.show("Error", "Upss! ha ocurrido un error. Error: "+er);
        });

  }

  edit_usuarios(){

    let flag = false;
    let batch = this.fireStore.firestore.batch();
    this.fireStore.collection("usuarios", ref => ref.where("uid","==","CdlYDA0MU5XGdb0ODnZMzqDuzoq2")).snapshotChanges().subscribe( vals => {
      this.usuarios = vals.map( item => {
        return{
          id: item.payload.doc.data().id,
          nombre: item.payload.doc.data().nombre,
          uid: item.payload.doc.data().uid
        }
      });
      
      new Promise((x,y)=>{
        this.usuarios.forEach( (item: User) =>{

          let ref = this.fireStore.doc('usuarios/'+item.id).ref;
          batch.update(ref, {last__: "jsquare"});

        });
        x({succed: true});
      }).then( ()=>{
        batch.commit().then( () => {
          console.log("actualizado con exito");
        })
      });


    });
  
  }

  get_categorias(): AngularFirestoreCollection<any>{
    return this.fireStore.collection("categorias", ref => ref.orderBy("categoria", "asc"));
  }

  add_palabra(data, user){

    this.palabra.id = this.fireStore.createId();
    this.palabra.palabra = data.palabra.toLowerCase();
    this.palabra.ejemplos = data.ejemplos;
    this.palabra.departamentos = data.departamentos;
    this.palabra.definicion = data.definicion;
    this.palabra.categorias = data.categorias;
    this.palabra.usuario = user;

    this.fireStore.doc("diccionario/"+this.palabra.id).set(this.palabra)
        .then(() => {
          this.message.show("¡Éxito!", "Se ha agregado la palabra exitosamente.");
        
        })
        .catch( (er) => {
          this.message.show("Error", "Upss! ha ocurrido un error. Error: "+er);
        });

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
