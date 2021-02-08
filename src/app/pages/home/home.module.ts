import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SelectionCardComponent } from 'src/app/components/selection-card/selection-card.component';
import { HeaderToolbarComponent } from 'src/app/components/header-toolbar/header-toolbar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,
    SelectionCardComponent,
    HeaderToolbarComponent
  ]
})
export class HomePageModule {}
