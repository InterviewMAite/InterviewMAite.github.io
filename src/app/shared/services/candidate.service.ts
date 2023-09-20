import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICandidate } from '../interfaces/candidate.interface';

@Injectable({
    providedIn: 'root'
})
export class CandidateService {

    constructor(
        public http: HttpClient,
        public constantService: ConstantService
    ) { }

    getCandidates(): Observable<ICandidate[]> {
        return this.http.get<ICandidate[]>(
            this.constantService.getUrl(
                `${this.constantService.CANDIDATE}`
            ),
        );
    }
}
