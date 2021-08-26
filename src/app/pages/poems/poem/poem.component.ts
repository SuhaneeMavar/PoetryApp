import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poem } from 'app/models/poem';
import { PoemService } from 'app/services/poem.service';

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.css']
})
export class PoemComponent implements OnInit {

  poem: Poem = new Poem()

  constructor(private poemService: PoemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPoem()
  }

  getPoem() {
    this.poemService.getPoemById(this.route.snapshot.params['id']).subscribe(data => {
      this.poem = data
    })
  }

}
