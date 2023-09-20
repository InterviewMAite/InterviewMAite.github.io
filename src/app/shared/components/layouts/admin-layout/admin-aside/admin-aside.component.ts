import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICandidate } from 'src/app/shared/interfaces/candidate.interface';
import { CandidateService } from 'src/app/shared/services/candidate.service';

@Component({
    selector: 'app-admin-aside',
    templateUrl: './admin-aside.component.html',
    styleUrls: ['./admin-aside.component.scss']
})
export class AdminAsideComponent implements OnInit, OnDestroy {
    subscription = new Subscription();
    candidates: ICandidate[] = [];
    selectedCandidate: any;

    constructor(
        private candidateService: CandidateService,
        public toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        this.getCandidates();
    }

    getCandidates(): void {
        this.subscription.add(
            this.candidateService.getCandidates()
                .subscribe((response: ICandidate[]) => {
                    this.candidates = response;
                    this.selectedCandidate = this.candidates[0].id;
                })
        );
    }

    viewDetails(candidate: ICandidate): void {
        this.selectedCandidate = candidate.id
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
