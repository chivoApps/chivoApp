import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PalabrasListPage } from './palabras-list';

@NgModule({
  declarations: [
    PalabrasListPage,
  ],
  imports: [
    IonicPageModule.forChild(PalabrasListPage),
  ],
})
export class PalabrasListPageModule {}
