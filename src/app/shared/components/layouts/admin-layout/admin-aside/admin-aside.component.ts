import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICandidate } from 'src/app/shared/interfaces/candidate.interface';
import { CandidateService } from 'src/app/shared/services/candidate.service';
import { ConstantService } from 'src/app/shared/services/constant.service';

@Component({
    selector: 'app-admin-aside',
    templateUrl: './admin-aside.component.html',
    styleUrls: ['./admin-aside.component.scss'],
})
export class AdminAsideComponent implements OnInit, OnDestroy {
    subscription = new Subscription();
    candidates: ICandidate[] = [];
    filteredCandidate: ICandidate[] = [];
    selectedCandidate: any;
    filter: boolean = false;
    form: FormGroup = {} as FormGroup;

    constructor(
        private candidateService: CandidateService,
        public constantService: ConstantService,
        public toastr: ToastrService,
        private formBuilder: FormBuilder,
        public router: Router
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.getCandidates();
    }

    toggleFilter(): void {
        this.filter = !this.filter;
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            PENDING: [true],
            SHORTLISTED: [true],
            ON_HOLD: [true],
            DELETED: [true],
            REJECTED: [true],
            SELECTED: [true],
        });

        this.subscription.add(
            this.form.valueChanges.subscribe((value) => {
                var filtered = Object.keys(value).filter((key) => value[key]);

                this.filteredCandidate = this.candidates.filter((candidate) =>
                    filtered.includes(candidate.status)
                );
            })
        );
    }

    getCandidates(): void {
        this.subscription.add(
            this.candidateService.getCandidates().subscribe(
                (response: ICandidate[]) => {
                    this.candidates = response;
                    this.filteredCandidate = response;
                    this.selectedCandidate = this.candidates[0].id;
                    this.navigateToDetails(this.selectedCandidate);
                },
                (error: any) => {
                    if (error && error.status === 403) {
                        window.open(this.constantService.CORS_URL, '_blank');
                    }
                }
            )
        );
    }

    viewDetails(candidate: ICandidate): void {
        this.selectedCandidate = candidate.id;
        this.navigateToDetails(this.selectedCandidate);
    }

    navigateToDetails(candidateId: number): void {
        this.router.navigate(['/admin/' + candidateId]);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
