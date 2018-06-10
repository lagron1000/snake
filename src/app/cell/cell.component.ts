import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../cellModel';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

 @Input() myId : number;  
  cell : Cell = new Cell()
  snake : Object
  background : Object
  apple : Object


  constructor() {
    this.cell.id = this.myId
   }

  ngOnInit() {
  }

}
