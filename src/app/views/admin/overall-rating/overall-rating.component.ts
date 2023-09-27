import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRating } from '@interfaces/candidate.interface';

export interface DialogData {
    result: IRating;
}

@Component({
    selector: 'app-overall-rating',
    templateUrl: './overall-rating.component.html',
    styleUrls: ['./overall-rating.component.scss'],
})
export class OverallRatingComponent {
    results: IRating = {} as IRating;
    panelOpenState = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.results = this.data.result;
    }
}
