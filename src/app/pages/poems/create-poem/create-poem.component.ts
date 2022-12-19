import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poem } from 'app/models/poem';
import { PoemService } from 'app/services/poem.service';
import { UserService } from 'app/services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-poem',
  templateUrl: './create-poem.component.html',
  styleUrls: ['./create-poem.component.css']
})
export class CreatePoemComponent implements OnInit {

  poem: Poem = new Poem()

  constructor(private router:Router,private poemService: PoemService, private userService: UserService) { }

  ngOnInit(): void {
  }

  post() {
    let data: String = this.getPoemFromDocument()
    this.poem.poem = data
    this.userService.getAuthenticatedUser().pipe(finalize(() => {
      this.poemService.createPoem(this.poem).subscribe(data => {
        alert('Posted Successfully..')
        this.router.navigate(['/app'])
      }, error => {
        console.log(error);
        this.router.navigate(['/error'])
      })
    })).subscribe(user => {
      this.poem.user = user
    })
  }

  getPoemFromDocument(): String {
    let data: String = new String()
    data = document.getElementById('poem').innerText
    this.poem.title = document.getElementById('title').innerHTML
    data.replace('<div>', '\n')
    data.replace('</div>', '')
    return data
  }

}
