import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { LayoutsModule } from './shared/components/layouts/layouts.module';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgHttpLoaderModule.forRoot(),
        AppRoutingModule,
        LayoutsModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: "toast-top-right",
            preventDuplicates: true,
            closeButton: true,
            autoDismiss: false
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
