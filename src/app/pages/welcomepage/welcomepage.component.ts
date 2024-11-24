import { Component } from '@angular/core';
import { ParallaxComponent } from '../../ui/parallax/parallax.component';
@Component({
    selector: 'app-welcomepage',
    standalone: true,
    templateUrl: './welcomepage.component.html',
    styleUrl: './welcomepage.component.scss',
    imports: [ParallaxComponent]
})
export class WelcomepageComponent {

}
