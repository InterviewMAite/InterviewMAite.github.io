import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare var webkitSpeechRecognition: any;
@Injectable({
    providedIn: 'root',
})
export class VoiceRecognitionService {
    recognition: any;
    isStoppedSpeechRecognition = false;
    public text = '';
    private voiceToTextSubject: Subject<string> = new Subject();
    private speakingPaused: Subject<any> = new Subject();
    private tempWords: string = '';
    constructor() {}

    speechInput() {
        return this.voiceToTextSubject.asObservable();
    }

    init(): any {
        this.recognition = new webkitSpeechRecognition();
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.addEventListener('result', (e: any) => {
            const transcript = Array.from(e.results)
                .map((result: any) => result[0])
                .map((result) => result.transcript)
                .join('');
            this.tempWords = transcript;
            this.voiceToTextSubject.next(this.text || transcript);
        });
        return this.initListeners();
    }

    initListeners(): any {
        this.recognition.addEventListener('end', (condition: any) => {
            this.recognition.stop();
        });
        return this.speakingPaused.asObservable();
    }

    start(): void {
        this.text = '';
        this.isStoppedSpeechRecognition = false;
        this.recognition.start();
        this.recognition.addEventListener('end', (condition: any) => {
            if (this.isStoppedSpeechRecognition) {
                this.recognition.isActive = true;
                this.recognition.stop();
            } else {
                this.isStoppedSpeechRecognition = false;
                this.wordConcat();
                if (
                    !this.recognition.lastActiveTime ||
                    Date.now() - this.recognition.lastActive > 100
                ) {
                    this.recognition.start();
                    this.recognition.lastActive = Date.now();
                }
            }
            this.voiceToTextSubject.next(this.text);
        });
    }

    stop(): void {
        this.text = '';
        this.isStoppedSpeechRecognition = true;
        this.wordConcat();
        this.recognition.stop();
        this.recognition.isActive = false;
        this.speakingPaused.next('Stopped speaking');
    }

    wordConcat(): void {
        this.text = this.text.trim() + ' ' + this.tempWords;
        this.text = this.text.trim();
        this.tempWords = '';
    }
}
