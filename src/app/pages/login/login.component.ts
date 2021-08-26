import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { CookieService } from 'ngx-cookie-service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLogined()
  }

  onSubmit(form: NgForm) {
    let user = {
      email: form.controls.email.value,
      password: form.controls.password.value
    }
    this.authService.login(user)
  }

}
