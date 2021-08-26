import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poem } from 'app/models/poem';
import { User } from 'app/models/user';
import { AuthService } from 'app/services/auth.service';
import { PoemService } from 'app/services/poem.service';
import { UserService } from 'app/services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    user: User = new User()
    poems: Array<Poem> = new Array()
    constructor(private poemService: PoemService, private route: ActivatedRoute, private userService: UserService, private router:Router) { }

    ngOnInit() {
        this.getUser()
        this.getPoemsByUser()
    }

    getUser() {
        this.userService.getUserById(this.route.snapshot.params['id']).subscribe(data => {
            this.user = data
        },error=>{
            console.log(error);
            this.router.navigate(['/error'])
        })
    }

    getPoemsByUser() {
        this.poemService.getAllPoemsByUser(this.route.snapshot.params['id']).subscribe(data => {
            this.poems = data    
        },error=>{
            console.log(error);
            this.router.navigate(['/error'])
        })
    }
}
