import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BASE_URL } from 'environments/environment';
import { retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'app/models/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLogined = new BehaviorSubject(null)

  constructor(private router: Router, private http: HttpClient, private coockieService: CookieService) { }

  login(user) {
    let header = {
      "headers": new HttpHeaders({
        "Content-Type": "application/json"
      })

    }
    this.http.post(`${BASE_URL}auth/login`, JSON.stringify(user), header).pipe(retry(3)).subscribe(data => {
      let token: any = data
      this.coockieService.set('token', btoa(token.token), 1, null, null, false)
      console.log(atob(this.coockieService.get('token')));
      this.router.navigate(['/app'])
      this.isUserLogined.next(true)
    })
  }

  authenticateUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}auth/authenticate`).pipe(retry(3))
  }

  logOut() {
    this.coockieService.delete('token')
    this.isUserLogined.next(false)
  }

  isLogined(): boolean {
    const token = this.coockieService.get('token')
    if (token) {
      this.isUserLogined.next(true)
      return true
    }
    else {
      this.isUserLogined.next(false)
      return false
    }

  }

  getToken(): string {
    return this.coockieService.get('token')
  }
}
