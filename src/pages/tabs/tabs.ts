import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { DepartmentsPage } from '../departments/departments';
import { CategoriasListPage } from '../categorias-list/categorias-list';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: any;
  tab2: any;
  tab3: any;

  constructor() {

    this.tab1 = HomePage
    this.tab2 = DepartmentsPage
    this.tab3 = CategoriasListPage

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
