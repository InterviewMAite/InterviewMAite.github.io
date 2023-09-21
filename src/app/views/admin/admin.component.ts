import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICandidate } from 'src/app/shared/interfaces/candidate.interface';
import { CandidateService } from 'src/app/shared/services/candidate.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
    subscription = new Subscription();
    candidateID: any;
    candidateDetails: ICandidate = {} as ICandidate;

    constructor(
        public toastr: ToastrService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private candidateService: CandidateService,
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: any) => {
            if (params && params.candidateID) {
                this.candidateID = params.candidateID;

                this.getCandidateById(this.candidateID);
            }
        });
    }

    getCandidateById(candidateId: any): void {
        this.subscription.add(
            this.candidateService.getCandidateById(candidateId)
                .subscribe((response: ICandidate) => {
                    this.candidateDetails = response;
                })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
