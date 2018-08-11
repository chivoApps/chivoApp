import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartmentDetailPage } from './department-detail';
import { DatabaseProvider } from '../../providers/database/database';

@NgModule({
  declarations: [
    DepartmentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DepartmentDetailPage),
    DatabaseProvider
  ],
})
export class DepartmentDetailPageModule {}
