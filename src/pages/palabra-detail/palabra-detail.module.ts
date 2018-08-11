import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PalabraDetailPage } from './palabra-detail';

@NgModule({
  declarations: [
    PalabraDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PalabraDetailPage),
  ],
})
export class PalabraDetailPageModule {}
