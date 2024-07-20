import { Component } from '@angular/core';
import { RedheaderComponentComponent } from "../../layout/parent/redheader-component/redheader-component.component";
import { FormComponentComponent } from "./form-component/form-component.component";

@Component({
    selector: 'app-visitor-form',
    standalone: true,
    templateUrl: './visitor-form.component.html',
    styleUrl: './visitor-form.component.scss',
    imports: [RedheaderComponentComponent, FormComponentComponent]
})
export class VisitorFormComponent {

}
