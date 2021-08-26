import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poem } from 'app/models/poem';
import { PoemService } from 'app/services/poem.service';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {

  poems: Poem[] = new Array()

  constructor(private router:Router,private poemService: PoemService) { }

  ngOnInit(): void {
    this.getAllPoems()
  }

  getAllPoems() {
    this.poemService.getAllPoems().subscribe(data => {
      this.poems = data
    }, error => {
      console.log(error);
      this.router.navigate(['/error'])
    })
  }
}
