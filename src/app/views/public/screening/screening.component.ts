import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { candidates, jobs } from 'src/app/inMemoryDB/data';
import { ICandidate, IJob } from 'src/app/shared/interfaces/screening.interface';
declare var anime: any;

@Component({
    selector: 'app-screening',
    templateUrl: './screening.component.html',
    styleUrls: ['./screening.component.scss']
})
export class ScreeningComponent implements OnInit, AfterViewInit, OnDestroy {
    screeningId: string = "";
    candidateDetails: ICandidate = {} as ICandidate;
    jobDetails: IJob = {} as IJob;

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: any) => {
            if (params && params.screeningId) {
                this.screeningId = params.screeningId;

                this.fetchCandidateDetails(this.screeningId);
            }
        });
    }

    fetchCandidateDetails(candidateId: string): void {
        this.candidateDetails = candidates.filter(
            (candidate: ICandidate) => candidate.screeningId === candidateId
        )[0];


        if (!this.candidateDetails) {
            this.toastr.error("Invalid Screening Id, Navigating to home!", "Error!")
            this.router.navigate(["/"]);
        } else {
            this.fetchJobDetails(this.candidateDetails.jobId);
        }
    }

    fetchJobDetails(jobID: string): void {
        this.jobDetails = jobs.filter((job: IJob) => job.jobId === jobID)[0];
    }

    ngAfterViewInit(): void {
        const textWrapper: any = document.getElementById("text");
        if (textWrapper !== null) {
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

            anime.timeline({ loop: false })
                .add({
                    targets: '.an-1 .letter',
                    scale: [4, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeOutExpo",
                    duration: 950,
                    delay: (el: any, i: any) => 200 * i
                })

        }
    }

    ngOnDestroy(): void {
    }
}
