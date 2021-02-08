import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZorroPageRoutingModule } from './zorro-routing.module';

import { ZorroPage } from './zorro.page';
import { HeaderToolbarComponent } from 'src/app/components/header-toolbar/header-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZorroPageRoutingModule
  ],
  declarations: [
    ZorroPage,
    HeaderToolbarComponent
  ]
})
export class ZorroPageModule {}
