import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { Cell } from '../cellModel';
import { SnakeService } from '../snake.service';
import { Snake } from '../SnakeModel';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

 @Input() myId : number;  
  cell : Cell = new Cell()
  snake : Snake
  background : Object
  apple : Object
  showStyle : boolean


  constructor(private snakeService : SnakeService) {
    this.cell.id = this.myId
    this.showStyle = false
   }

  ngOnInit() {
    for (let i = 0; i<this.snakeService.currentSnake.length; i++){
      if (this.snakeService.currentSnake[i].id === this.myId){
        this.showStyle = true
      }
    }
  }
  getStyle() {
    return this.snakeService.checkStyle(this.myId)
  }


}
