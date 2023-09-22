import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ConstantService {
    API_URL: string = "https://cors-anywhere.herokuapp.com/http://16.16.0.88:8080/v1/api";
    noCacheHttp = {
        headers: new HttpHeaders().set("cache", "no-cache"),
    };

    constructor() {
    }

    CANDIDATE = "/candidate";

    getUrl(path: string, params: string[] = []): string {
        return !params.length
            ? [this.API_URL, path].join("")
            : [[this.API_URL, path].join(""), params.join("/")].join("/");
    }

    getHostingURL(): string {
        return this.API_URL;
    }
}
