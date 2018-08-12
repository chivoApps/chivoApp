import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriasListPage } from './categorias-list';

@NgModule({
  declarations: [
    CategoriasListPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriasListPage),
  ],
})
export class CategoriasListPageModule {}
