import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicComponent } from './public.component';
import { ScreeningComponent } from './screening/screening.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

@NgModule({
    declarations: [
        PublicComponent,
        NotFoundComponent,
        ScreeningComponent
    ],
    imports: [
        CommonModule,
        PublicRoutingModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
    ]
})
export class PublicModule { }
