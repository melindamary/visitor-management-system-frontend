import { Component } from '@angular/core';
import { LoginFormComponent } from "./components/login-form/login-form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
