import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';

import { PublicRoutingModule } from './public-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicComponent } from './public.component';
import { ScreeningComponent } from './screening/screening.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoRecordingService } from '@services/video-recording.service';

@NgModule({
    declarations: [PublicComponent, NotFoundComponent, ScreeningComponent],
    imports: [
        CommonModule,
        PublicRoutingModule,
        MatStepperModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        LayoutModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [VideoRecordingService],
})
export class PublicModule {}
