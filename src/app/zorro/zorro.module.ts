import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZorroPageRoutingModule } from './zorro-routing.module';

import { ZorroPage } from './zorro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZorroPageRoutingModule
  ],
  declarations: [ZorroPage]
})
export class ZorroPageModule {}
