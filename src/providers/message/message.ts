import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {

  constructor(private alertCtrl: AlertController) {
    
  }

  showConfirm(titulo, mensaje, btn, func){
    this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Acción Cancelada');
          }
        },
        {
          text: btn,
          handler: () => {
            func();
          }
        }
      ]
    }).present();

  }

  show(titulo, subtitulo){
    this.alertCtrl.create({
        title: titulo,
        subTitle: subtitulo,
        buttons: ['Aceptar']
      }).present();
  }



}
