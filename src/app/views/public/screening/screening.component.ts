import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { jobs } from 'src/app/inMemoryDB/data';
import { ICandidate } from 'src/app/shared/interfaces/candidate.interface';
import { IJob } from 'src/app/shared/interfaces/screening.interface';
import { CandidateService } from 'src/app/shared/services/candidate.service';
declare var anime: any;

@Component({
    selector: 'app-screening',
    templateUrl: './screening.component.html',
    styleUrls: ['./screening.component.scss']
})
export class ScreeningComponent implements OnInit, OnDestroy {
    subscription = new Subscription();
    candidateId: string = "";
    candidateDetails: ICandidate = {} as ICandidate;
    jobDetails: IJob = {} as IJob;

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public toastr: ToastrService,
        private candidateService: CandidateService
    ) { }

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
            this.candidateService.getCandidateById(candidateId)
                .subscribe((response: ICandidate) => {
                    this.candidateDetails = response;

                    if (!this.candidateDetails) {
                        this.toastr.error("Invalid Screening Id, Navigating to home!", "Error!")
                        this.router.navigate(["/"]);
                    } else {
                        // this.fetchJobDetails(this.candidateDetails.jobId);
                    }
                })
        );

    }

    fetchJobDetails(jobID: string): void {
        this.jobDetails = jobs.filter((job: IJob) => job.jobId === jobID)[0];
    }

    // ngAfterViewInit(): void {
    //     const textWrapper: any = document.getElementById("text");
    //     if (textWrapper !== null) {
    //         textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    //         anime.timeline({ loop: false })
    //             .add({
    //                 targets: '.an-1 .letter',
    //                 scale: [4, 1],
    //                 opacity: [0, 1],
    //                 translateZ: 0,
    //                 easing: "easeOutExpo",
    //                 duration: 950,
    //                 delay: (el: any, i: any) => 200 * i
    //             })

    //     }
    // }

    ngOnDestroy(): void {
    }
}
