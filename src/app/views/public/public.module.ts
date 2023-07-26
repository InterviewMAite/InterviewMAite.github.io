import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicComponent } from './public.component';


@NgModule({
  declarations: [
    PublicComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
