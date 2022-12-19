import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poem } from 'app/models/poem';
import { User } from 'app/models/user';
import { PoemService } from 'app/services/poem.service';
import { UserService } from 'app/services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User = new User()
  poems: Poem[] = new Array()

  constructor(private router:Router,private userService: UserService, private poemService: PoemService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.userService.getAuthenticatedUser().pipe(finalize(() => {
      this.poemService.getAllPoemsByUser(this.user._id).subscribe(data => {
        this.poems = data
      }, error => {
        console.log(error);
        this.router.navigate(['/error'])
      })
    })).subscribe(data => {
      this.user = data
    })
  }

  delete(id: String) {
    this.poemService.deletePoem(id).pipe(finalize(() => {
      alert('Deleted successfully..')
      this.poemService.getAllPoemsByUser(this.user._id).subscribe(data => {
        this.poems = data
      }, error => {
        console.log(error);
        this.router.navigate(['/error'])
      })
    })).subscribe()
  }


}
