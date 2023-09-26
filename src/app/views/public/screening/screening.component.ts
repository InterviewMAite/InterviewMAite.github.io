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
    IBodyScreeningResponse,
    IScreeningQuestion,
    IValidateScreeningResponse,
} from '@interfaces/screening.interface';
import { AudioRecordingService } from '@services/audio-recording.service';

@Component({
    selector: 'app-screening',
    templateUrl: './screening.component.html',
    styleUrls: ['./screening.component.scss'],
})
export class ScreeningComponent implements OnInit, OnDestroy {
    @ViewChild('videoElement', { static: false }) videoElement: any;
    subscription = new Subscription();
    screeningId: string = '';
    screeningDetails: IValidateScreeningResponse =
        {} as IValidateScreeningResponse;
    question: IScreeningQuestion = {} as IScreeningQuestion;
    stepperOrientation: Observable<StepperOrientation>;
    progress = 0;
    invalid = false;
    isVideoRecording = false;
    isAudioRecording = false;
    audioBlobUrl: any;
    videoBlobUrl: any;
    audioRecordedTime: any;
    videoRecordedTime: any;
    videoBlob: any;
    audioBlob: any;
    audioName: any;
    videoName: any;
    videoConf = {
        video: { facingMode: 'user', width: 320 },
        audio: { echoCancellation: true },
    };
    videoStream: MediaStream = {} as MediaStream;
    video: any;

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public toastr: ToastrService,
        private screeningService: ScreeningService,
        public breakpointObserver: BreakpointObserver,
        private audioRecordingService: AudioRecordingService,
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

        this.audioRecordingService.recordingFailed().subscribe(() => {
            this.isAudioRecording = false;
            this.ref.detectChanges();
        });

        this.audioRecordingService.getRecordedTime().subscribe((time) => {
            this.audioRecordedTime = time;
            this.ref.detectChanges();
        });

        this.audioRecordingService.getRecordedBlob().subscribe((data) => {
            this.audioBlob = data.blob;
            this.audioName = data.title;
            this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(
                URL.createObjectURL(data.blob)
            );
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

    validateScreeningId(screeningId: string): void {
        this.subscription.add(
            this.screeningService
                .validateScreening(screeningId)
                .subscribe((response: IValidateScreeningResponse) => {
                    if (!response?.inValid) {
                        this.invalid = false;
                        this.screeningDetails = response;
                    } else {
                        this.invalid = true;
                    }
                })
        );
    }

    getScreeningQuestion(): void {
        this.subscription.add(
            this.screeningService
                .getScreeningQuestion(this.screeningId)
                .subscribe((response: IScreeningQuestion) => {
                    this.question = response;
                    this.progress = Math.round(
                        ((this.question.questionId - 1) /
                            this.screeningDetails.numberOfQuestions) *
                            100
                    );

                    this.video = this.videoElement.nativeElement;
                })
        );
    }

    saveResponse(body: IBodyScreeningResponse): void {
        this.subscription.add(
            this.screeningService
                .saveResponses(this.screeningId, body)
                .subscribe((response: any) => {
                    this.getScreeningQuestion();
                })
        );
    }

    skip(): void {
        const body: IBodyScreeningResponse = {
            questionId: this.question.questionId,
            candidateResponse: '',
        };
        this.saveResponse(body);
    }

    next(): void {
        const body: IBodyScreeningResponse = {
            questionId: this.question.questionId,
            candidateResponse: 'candidateResponse',
        };
        this.saveResponse(body);
    }

    startVideoRecording(): void {
        if (!this.isVideoRecording) {
            this.video.controls = false;
            this.isVideoRecording = true;
            this.videoRecordingService
                .startRecording(this.videoConf)
                .then((stream) => {
                    this.video.srcObject = stream;
                    this.video.play();
                })
                .catch(function (err) {
                    console.log(err.name + ': ' + err.message);
                });
        }
    }

    abortVideoRecording(): void {
        if (this.isVideoRecording) {
            this.isVideoRecording = false;
            this.videoRecordingService.abortRecording();
            this.video.controls = false;
        }
    }

    stopVideoRecording(): void {
        if (this.isVideoRecording) {
            this.videoRecordingService.stopRecording();
            this.video.srcObject = this.videoBlobUrl;
            this.isVideoRecording = false;
            this.video.controls = true;
        }
    }

    clearVideoRecordedData(): void {
        this.videoBlobUrl = null;
        this.video.srcObject = null;
        this.video.controls = false;
        this.ref.detectChanges();
    }

    downloadVideoRecordedData(): void {
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

    startAudioRecording() {
        if (!this.isAudioRecording) {
            this.isAudioRecording = true;
            this.audioRecordingService.startRecording();
        }
    }

    abortAudioRecording() {
        if (this.isAudioRecording) {
            this.isAudioRecording = false;
            this.audioRecordingService.abortRecording();
        }
    }

    stopAudioRecording() {
        if (this.isAudioRecording) {
            this.audioRecordingService.stopRecording();
            this.isAudioRecording = false;
        }
    }

    clearAudioRecordedData() {
        this.audioBlobUrl = null;
    }

    downloadAudioRecordedData() {
        this._downloadFile(this.audioBlob, 'audio/mp3', this.audioName);
    }

    ngOnDestroy(): void {
        this.abortAudioRecording();
        this.abortVideoRecording();
        this.subscription.unsubscribe();
    }
}
