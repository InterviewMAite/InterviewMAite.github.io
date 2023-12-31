import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { statuses } from './data';
import {
    ICandidate,
    IQuestion,
    IRating,
    IStatus,
} from '@interfaces/candidate.interface';
import { ScreeningService } from '@services/screening.service';
import { CandidateService } from '@services/candidate.service';
import { OverallRatingComponent } from './overall-rating/overall-rating.component';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
    subscription = new Subscription();
    candidateID: any;
    candidateDetails: ICandidate = {} as ICandidate;
    questions: IQuestion[] = [];
    screeningLink: string = '';
    status: string = '';
    statusValue: IStatus = {} as IStatus;
    statusMap: IStatus[] = statuses;
    result: IRating = {} as IRating;

    constructor(
        public toastr: ToastrService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private candidateService: CandidateService,
        private screeningService: ScreeningService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: any) => {
            if (params && params.candidateID) {
                this.candidateID = params.candidateID;

                this.getCandidateById(this.candidateID);
            }
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(OverallRatingComponent, {
            data: {
                result: this.result,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    getCandidateById(candidateId: any): void {
        this.subscription.add(
            this.candidateService
                .getCandidateById(candidateId)
                .subscribe((response: ICandidate) => {
                    this.candidateDetails = response;
                    this.questions = response.questionnaire;
                    this.status = response.status;

                    if (this.status === 'COMPLETED') {
                        this.getCandidateResultById(
                            this.candidateDetails.screeningId
                        );
                    }
                    const statusVar = this.statusMap.find(
                        (status: IStatus) => status.key === response.status
                    );
                    if (statusVar) {
                        this.statusValue = statusVar;
                    }

                    this.screeningLink =
                        window.location.origin + '/screening/' + response.id;
                })
        );
    }

    getCandidateResultById(candidateId: any): void {
        this.subscription.add(
            this.screeningService
                .getScreeningResult(candidateId)
                .subscribe((response: IRating) => {
                    this.result = response;
                })
        );
    }

    deleteCandidate(): void {
        this.subscription.add(
            this.candidateService
                .deleteCandidateById(this.candidateID)
                .subscribe((response: any) => {
                    this.toastr.success(
                        'Candidate deleted successfully!',
                        'Successful!'
                    );
                    this.candidateService.parentFetchCandidate(true);
                })
        );
    }

    changeStatus(status: IStatus): void {
        this.subscription.add(
            this.candidateService
                .changeCandidateStatusById(this.candidateID, status.key)
                .subscribe((response: any) => {
                    this.status = status.key;
                    this.statusValue = status;
                    this.candidateService.parentFetchCandidate(true);
                    this.toastr.success(
                        'Candidate status updated successfully!',
                        'Successful!'
                    );
                })
        );
    }

    navigateToScreening(): void {
        window.open(this.screeningLink, '_blank');
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
