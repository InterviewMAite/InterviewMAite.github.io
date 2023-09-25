import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConstantService {
    CORS_URL = 'https://cors-anywhere.herokuapp.com/';
    API_URL: string = this.CORS_URL + 'http://16.16.0.88:8080/v1/api';
    noCacheHttp = {
        headers: new HttpHeaders().set('cache', 'no-cache'),
    };

    constructor() {}

    CANDIDATE = '/candidate';
    VALIDATE_SCREENING_ID = '/screening/validate/';
    SCREENING_RESPONSE_ID = '/screening/response/';
    GET_SCREENING_QUESTION = '/screening/next/';

    getUrl(path: string, params: string[] = []): string {
        return !params.length
            ? [this.API_URL, path].join('')
            : [[this.API_URL, path].join(''), params.join('/')].join('/');
    }

    getHostingURL(): string {
        return this.API_URL;
    }
}
