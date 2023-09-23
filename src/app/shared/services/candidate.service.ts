import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICandidate } from '../interfaces/candidate.interface';

@Injectable({
    providedIn: 'root',
})
export class CandidateService {
    private fetchCandidate = new BehaviorSubject(false);
    willFetchCandidate = this.fetchCandidate.asObservable();

    constructor(
        public http: HttpClient,
        public constantService: ConstantService
    ) {}

    parentFetchCandidate(res: boolean): void {
        this.fetchCandidate.next(res);
    }

    getCandidates(): Observable<ICandidate[]> {
        return this.http.get<ICandidate[]>(
            this.constantService.getUrl(`${this.constantService.CANDIDATE}`)
        );
    }

    getCandidateById(id: string): Observable<ICandidate> {
        return this.http.get<ICandidate>(
            this.constantService.getUrl(
                `${this.constantService.CANDIDATE}/${id}`
            )
        );
    }

    deleteCandidateById(id: string): Observable<any> {
        return this.http.delete<any>(
            this.constantService.getUrl(
                `${this.constantService.CANDIDATE}/${id}`
            )
        );
    }

    changeCandidateStatusById(
        candidateId: string,
        status: string
    ): Observable<any> {
        return this.http.put<any>(
            this.constantService.getUrl(
                `${this.constantService.CANDIDATE}/${candidateId}/status/${status}`
            ),
            {}
        );
    }
}
