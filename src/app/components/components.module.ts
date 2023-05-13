import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { Select2SearchComponent } from './select2-search/select2-search.component';

@NgModule({
  declarations: [
    HeaderComponent
    ,Select2SearchComponent
  ],
  exports: [HeaderComponent, Select2SearchComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
