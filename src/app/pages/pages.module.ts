import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ShareModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";

@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        ShareModule,
        PAGES_ROUTES,
        FormsModule
    ]
})
export class PagesModule { }