import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Cell } from './cellModel';
import { Snake } from './SnakeModel';

@Injectable({
  providedIn: 'root'
})
export class SnakeService {
  grid : Array<any> = new Array
  gridSubject : Subject<any[]> = new Subject<any[]>();
  gridObservable : Observable<any[]>
  currentSnake : Snake
  constructor() { 
    // this.gridObservable = this.gridSubject.asObservable()
    this.getGrid()
    this.currentSnake = this.grid.find(function(cell) {
      return cell.id == 210;
    });
    console.log(this.currentSnake)
  }
  getGrid(){
    for (let i=1; i<= 400; i++){
      var cell = {
        id : i
      }
      this.grid.push(cell)
    }
    return this.grid
  }
  moveUp(){
    var currentCellId = this.currentSnake.id
    this.currentSnake = this.grid.find(function(cell) {
      return cell.id === (currentCellId - 20)
    });
  }
  moveDown(){
    var currentCellId = this.currentSnake.id
    this.currentSnake = this.grid.find(function(cell) {
      return cell.id === (currentCellId + 20)
    });
  }
  handleKeyPress(event){
    if (event.key == 'ArrowUp'){
      this.moveUp()
    } else if (event.key == 'ArrowDown'){
      this.moveDown()
    }
    console.log(this.currentSnake)
  }
}
