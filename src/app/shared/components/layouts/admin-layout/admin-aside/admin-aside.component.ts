import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICandidate } from '@interfaces/candidate.interface';
import { CandidateService } from '@services/candidate.service';
import { ConstantService } from '@services/constant.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

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
        public activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        public router: Router
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.getCandidates();

        this.activatedRoute.params.subscribe((params: any) => {
            if (params && params.candidateID) {
                this.selectedCandidate = params.candidateID;
            }
        });

        this.candidateService.willFetchCandidate.subscribe((res: boolean) => {
            if (res) {
                this.getCandidates();
            }
        });
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
            COMPLETED: [true],
        });

        this.subscription.add(
            this.form.valueChanges.subscribe((value: any) => {
                var filtered = Object.keys(value).filter((key) => value[key]);

                this.filteredCandidate = this.candidates.filter((candidate) =>
                    filtered.includes(candidate.status)
                );
            })
        );
    }

    getCandidates(): void {
        this.subscription.add(
            this.candidateService
                .getCandidates()
                .subscribe((response: ICandidate[]) => {
                    this.candidates = response;
                    this.filteredCandidate = response;

                    if (!this.selectedCandidate) {
                        this.selectedCandidate = this.candidates[0].id;
                        this.navigateToDetails(this.selectedCandidate);
                    }
                })
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
