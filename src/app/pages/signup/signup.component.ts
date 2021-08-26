import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    constructor(private userService: UserService,private router:Router) { }

    user: User = new User

    ngOnInit() { }

    onSubmit() {
        this.userService.registerUser(this.user).subscribe(data=>{
            this.router.navigate(['/login'])
        },error=>{console.log(error)
            this.router.navigate(['/error'])
        })
    }
}
