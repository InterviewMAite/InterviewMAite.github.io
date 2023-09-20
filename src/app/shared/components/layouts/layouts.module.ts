import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { PublicFooterComponent } from "./public-layout/public-footer/public-footer.component";
import { PublicHeaderComponent } from "./public-layout/public-header/public-header.component";
import { PublicLayoutComponent } from "./public-layout/public-layout.component";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin-layout/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-layout/admin-footer/admin-footer.component';
import { AdminAsideComponent } from './admin-layout/admin-aside/admin-aside.component';

const components = [
    PublicFooterComponent,
    PublicHeaderComponent,
    PublicLayoutComponent,
    AdminLayoutComponent,
    AdminAsideComponent,
    AdminFooterComponent,
    AdminHeaderComponent
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
