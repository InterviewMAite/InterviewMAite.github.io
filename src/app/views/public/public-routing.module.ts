import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ScreeningComponent } from './screening/screening.component';

const routes: Routes = [
    { path: "", component: PublicComponent },
    { path: "screening/:candidateId", component: ScreeningComponent },
    { path: "page-not-found", component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule { }
