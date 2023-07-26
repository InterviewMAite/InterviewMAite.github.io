import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { PublicFooterComponent } from "./public-layout/public-footer/public-footer.component";
import { PublicHeaderComponent } from "./public-layout/public-header/public-header.component";
import { PublicLayoutComponent } from "./public-layout/public-layout.component";

const components = [
  PublicFooterComponent,
  PublicHeaderComponent,
  PublicLayoutComponent
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  declarations: components,
  exports: components,
})
export class LayoutsModule { }
