import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoRecordingService } from '@services/video-recording.service';

import { PublicRoutingModule } from './public-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicComponent } from './public.component';
import { ScreeningComponent } from './screening/screening.component';

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
        MatProgressBarModule,
    ],
    providers: [VideoRecordingService],
})
export class PublicModule {}
