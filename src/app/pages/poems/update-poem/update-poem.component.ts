import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poem } from 'app/models/poem';
import { PoemService } from 'app/services/poem.service';

@Component({
  selector: 'app-update-poem',
  templateUrl: './update-poem.component.html',
  styleUrls: ['./update-poem.component.css']
})
export class UpdatePoemComponent implements OnInit {

  poem:Poem=new Poem()
  constructor(private router:Router,private poemService:PoemService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getPoem()
  }

  getPoem()
  {
    this.poemService.getPoemById(this.route.snapshot.params['id']).subscribe(data=>{
      this.poem=data
    })
  }

  edit() {
    this.poem.title = document.getElementById('title').innerText
    let data: String = new String()
    data = document.getElementById('poem').innerText
    data.replace('<div>', '\n')
    data.replace('</div>', '')
    this.poem.poem = data
    this.poemService.updatePoem(this.poem).subscribe(data => {
      alert('Editted Successfully..')
      this.router.navigate(['/app'])
    }, error => {
      console.log(error);
      this.router.navigate(['/error'])
    })

  }
}
