import { Component } from "@angular/core";

@Component({
    selector: "app-loader",
    template: `<img
        class="loader"
        src="assets/images/loading.gif"
        style="height: 300px; width: 540px"
    />`,
    styles: [
        `
            .loader {
                max-height: 30rem;
            }
        `,
    ],
})
export class LoaderComponent { }
