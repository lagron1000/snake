import { Component, OnInit } from '@angular/core';
import { SnakeService } from '../snake.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyPress($event)',
  }
})

export class GridComponent implements OnInit {

  grid : Array<any>
  keyPressed

  constructor(private snakeService : SnakeService) {
    this.grid = this.snakeService.grid;
    // document.addEventListener("keydown", this.handleKeyPress)
   }

  ngOnInit() {
    // this.snakeService.gridObservable.subscribe((data)=>{

    // })
  }
  nextCell(id){
    // this.snakeService.changeCell(id)
  }
  handleKeyPress=(event)=>{
    this.snakeService.handleKeyPress(event);
  }

}
