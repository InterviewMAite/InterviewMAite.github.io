import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { StepperOrientation } from '@angular/material/stepper';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { VideoRecordingService } from '@services/video-recording.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ScreeningService } from '@services/screening.service';
import {
    IScreeningQuestion,
    IValidateScreeningResponse,
} from '@interfaces/screening.interface';

@Component({
    selector: 'app-screening',
    templateUrl: './screening.component.html',
    styleUrls: ['./screening.component.scss'],
})
export class ScreeningComponent implements OnInit, OnDestroy {
    subscription = new Subscription();
    screeningId: string = '';
    screeningDetails: IValidateScreeningResponse =
        {} as IValidateScreeningResponse;
    question: IScreeningQuestion = {} as IScreeningQuestion;
    stepperOrientation: Observable<StepperOrientation>;

    isVideoRecording = false;
    videoBlobUrl: any;
    videoRecordedTime: any;
    videoBlob: any;
    videoName: any;
    videoConf = {
        video: { facingMode: 'user', width: 320 },
        audio: true,
    };
    videoStream: MediaStream = {} as MediaStream;
    @ViewChild('videoElement', { static: false }) videoElement: any;

    video: any;

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public toastr: ToastrService,
        private screeningService: ScreeningService,
        public breakpointObserver: BreakpointObserver,
        private videoRecordingService: VideoRecordingService,
        private ref: ChangeDetectorRef,
        private sanitizer: DomSanitizer
    ) {
        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 768px)')
            .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

        this.videoRecordingService.recordingFailed().subscribe(() => {
            this.isVideoRecording = false;
            this.ref.detectChanges();
        });

        this.videoRecordingService.getRecordedTime().subscribe((time) => {
            this.videoRecordedTime = time;
            this.ref.detectChanges();
        });

        this.videoRecordingService.getStream().subscribe((stream) => {
            this.videoStream = stream;
            this.ref.detectChanges();
        });

        this.videoRecordingService.getRecordedBlob().subscribe((data) => {
            this.videoBlob = data.blob;
            this.videoName = data.title;
            this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
            this.ref.detectChanges();
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: any) => {
            if (params && params.screeningId) {
                this.screeningId = params.screeningId;
                this.validateScreeningId(this.screeningId);
            }
        });
    }

    ngAfterViewInit() {
        // this.video = this.videoElement.nativeElement;
    }

    validateScreeningId(screeningId: string): void {
        this.subscription.add(
            this.screeningService
                .validateScreening(screeningId)
                .subscribe((response: IValidateScreeningResponse) => {
                    this.screeningDetails = response;
                })
        );
    }

    getScreeningQuestion(): void {
        this.subscription.add(
            this.screeningService
                .getScreeningQuestion(this.screeningId)
                .subscribe((response: IScreeningQuestion) => {
                    this.question = response;
                    this.video = this.videoElement.nativeElement;
                })
        );
    }

    startVideoRecording() {
        if (!this.isVideoRecording) {
            this.video.controls = false;
            this.isVideoRecording = true;
            this.videoRecordingService
                .startRecording(this.videoConf)
                .then((stream) => {
                    // this.video.src = window.URL.createObjectURL(stream);
                    this.video.srcObject = stream;
                    this.video.play();
                })
                .catch(function (err) {
                    console.log(err.name + ': ' + err.message);
                });
        }
    }

    abortVideoRecording() {
        if (this.isVideoRecording) {
            this.isVideoRecording = false;
            this.videoRecordingService.abortRecording();
            this.video.controls = false;
        }
    }

    stopVideoRecording() {
        if (this.isVideoRecording) {
            this.videoRecordingService.stopRecording();
            this.video.srcObject = this.videoBlobUrl;
            this.isVideoRecording = false;
            this.video.controls = true;
        }
    }

    clearVideoRecordedData() {
        this.videoBlobUrl = null;
        this.video.srcObject = null;
        this.video.controls = false;
        this.ref.detectChanges();
    }

    downloadVideoRecordedData() {
        this._downloadFile(this.videoBlob, 'video/mp4', this.videoName);
    }

    _downloadFile(data: any, type: string, filename: string): any {
        const blob = new Blob([data], { type: type });
        const url = window.URL.createObjectURL(blob);
        //this.video.srcObject = stream;
        //const url = data;
        const anchor = document.createElement('a');
        anchor.download = filename;
        anchor.href = url;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    ngOnDestroy(): void {}
}
