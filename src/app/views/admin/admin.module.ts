import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { OverallRatingComponent } from './overall-rating/overall-rating.component';
@NgModule({
    declarations: [AdminComponent, OverallRatingComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
    ],
})
export class AdminModule {}
