import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { StepperOrientation } from '@angular/material/stepper';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { jobs } from 'src/app/inMemoryDB/data';
import { ICandidate } from 'src/app/shared/interfaces/candidate.interface';
import { IJob } from 'src/app/shared/interfaces/screening.interface';
import { CandidateService } from 'src/app/shared/services/candidate.service';
import { BreakpointObserver } from '@angular/cdk/layout';
declare var anime: any;

@Component({
    selector: 'app-screening',
    templateUrl: './screening.component.html',
    styleUrls: ['./screening.component.scss'],
})
export class ScreeningComponent implements OnInit, OnDestroy {
    subscription = new Subscription();
    candidateId: string = '';
    candidateDetails: ICandidate = {} as ICandidate;
    jobDetails: IJob = {} as IJob;
    firstFormGroup: FormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    secondFormGroup: FormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
    });
    thirdFormGroup: FormGroup = this._formBuilder.group({
        thirdCtrl: ['', Validators.required],
    });
    stepperOrientation: Observable<StepperOrientation>;

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public toastr: ToastrService,
        private _formBuilder: FormBuilder,
        private candidateService: CandidateService,
        public breakpointObserver: BreakpointObserver
    ) {
        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 768px)')
            .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: any) => {
            if (params && params.candidateId) {
                this.candidateId = params.candidateId;

                this.fetchCandidateDetails(this.candidateId);
            }
        });
    }

    fetchCandidateDetails(candidateId: string): void {
        this.subscription.add(
            this.candidateService
                .getCandidateById(candidateId)
                .subscribe((response: ICandidate) => {
                    this.candidateDetails = response;

                    if (!this.candidateDetails) {
                        this.toastr.error(
                            'Invalid Screening Id, Navigating to home!',
                            'Error!'
                        );
                        this.router.navigate(['/']);
                    } else {
                        // this.fetchJobDetails(this.candidateDetails.jobId);
                    }
                })
        );
    }

    fetchJobDetails(jobID: string): void {
        this.jobDetails = jobs.filter((job: IJob) => job.jobId === jobID)[0];
    }

    ngOnDestroy(): void {}
}
