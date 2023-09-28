import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent {
    constructor(public router: Router) {}

    navigateToHome(): void {
        this.router.navigate(['/']);
        setTimeout(() => {
            location.reload();
        }, 5000);
    }
}
