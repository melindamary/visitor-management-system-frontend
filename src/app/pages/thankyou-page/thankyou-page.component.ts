import { Component } from '@angular/core';
import { RedheaderComponentComponent } from "../../layout/parent/redheader-component/redheader-component.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-thankyou-page',
    standalone: true,
    templateUrl: './thankyou-page.component.html',
    styleUrl: './thankyou-page.component.scss',
    imports: [RedheaderComponentComponent]
})
export class ThankyouPageComponent {
constructor(private router: Router){}
ngOnInit(): void {
  
  setTimeout(() => {
    this.router.navigate(['/visitorForm']);
  }, 7000); 
}

}
