import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PalabrasPage } from './palabras';

import { DatabaseProvider } from "../../providers/database/database";

@NgModule({
  declarations: [
    PalabrasPage,
  ],
  imports: [
    IonicPageModule.forChild(PalabrasPage),
    DatabaseProvider
  ],
})
export class PalabrasPageModule {}
