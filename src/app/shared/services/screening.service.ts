import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    IBodyScreeningResponse,
    IScreeningQuestion,
    IValidateScreeningResponse,
} from '@interfaces/screening.interface';

@Injectable({
    providedIn: 'root',
})
export class ScreeningService {
    constructor(
        public http: HttpClient,
        public constantService: ConstantService
    ) {}

    validateScreening(
        screeningID: string
    ): Observable<IValidateScreeningResponse> {
        return this.http.post<IValidateScreeningResponse>(
            this.constantService.getUrl(
                `${this.constantService.VALIDATE_SCREENING_ID}/${screeningID}`
            ),
            {}
        );
    }

    saveResponses(
        screeningID: string,
        body: IBodyScreeningResponse
    ): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(
                `${this.constantService.SCREENING_RESPONSE_ID}/${screeningID}`
            ),
            body
        );
    }

    getScreeningQuestion(screeningID: string): Observable<IScreeningQuestion> {
        return this.http.get<IScreeningQuestion>(
            this.constantService.getUrl(
                `${this.constantService.GET_SCREENING_QUESTION}/${screeningID}`
            )
        );
    }

    getScreeningResult(screeningID: string): Observable<any> {
        return this.http.get<any>(
            this.constantService.getUrl(
                `${this.constantService.GET_SCREENING_RESULT}/${screeningID}`
            )
        );
    }
}
