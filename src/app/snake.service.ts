import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Cell } from './cellModel';
import { Snake } from './SnakeModel';
import { Score } from './ScoreModel';

@Injectable({
  providedIn: 'root'
})
export class SnakeService {
  grid : Array<any> = new Array
  gridSubject : Subject<any[]> = new Subject();
  gridObservable : Observable<any[]>
  currentSnake : Array<any>
  currentApple
  keyPressed : string
  rowArray : Array<any>
  score : Score = new Score
  highScore : Score = new Score
  isPaused : boolean
  constructor() { 
    this.isPaused = false
    this.getGrid()  
    this.rowArray = [1, 21, 41, 61, 81, 101, 121, 141, 161, 181, 201, 221, 241, 261, 281, 301, 321, 341, 361, 381]  
    this.currentSnake = []
    this.currentApple = this.getApple()
    this.gridSubject.asObservable()
    this.score.amount = 0
    var highScoreStorage : Score = JSON.parse(localStorage.getItem('highscore'))
    highScoreStorage.amount ? this.highScore.amount = highScoreStorage.amount : this.highScore.amount = 0;
    this.currentSnake.push(this.grid.find(function(cell) {
      return cell.id == 210;
    }))
    this.currentSnake.push(this.grid.find(function(cell) {
      return cell.id == 211;
    }))
    this.currentSnake.push(this.grid.find(function(cell) {
      return cell.id == 212;
    }))
    this.currentSnake.push(this.grid.find(function(cell) {
      return cell.id == 213;
    }))
    this.gridObservable = this.gridSubject.asObservable()
    // this.currentSnake = this.grid.find(function(cell) {
    //   return cell.id == 210;
    // });
  }
  getScore(){
    return this.score
  }
  getHighscore(){
    return this.highScore
  }
  startGame(){
    this.currentSnake = []
    this.keyPressed = undefined
    this.score.amount = 0    
    this.currentSnake.push(this.grid.find(function(cell) {
      return cell.id == 210;
    }))
    this.currentSnake.push(this.grid.find(function(cell) {
      return cell.id == 211;
    }))
    this.currentSnake.push(this.grid.find(function(cell) {
      return cell.id == 212;
    }))
    this.currentSnake.push(this.grid.find(function(cell) {
      return cell.id == 213;
    }))
    this.currentApple = this.getApple()
  }
  getGrid(){
    for (let i=1; i<= 400; i++){
      var cell = {
        id : i
      }
      this.grid.push(cell)
      this.gridSubject.next(this.grid)      
    }
    return this.grid
  }
  getApple() {
    let ranNum = Math.floor(Math.random()*400+1)    
    var myApple = this.grid.find(function(cell){
      return cell.id == ranNum
    })
    return myApple
  }
  moveUp(){
    for (let i = this.currentSnake.length-1; i>0; i--){
      var tempI = i - 1
      this.currentSnake[i] = this.grid.find((cell) => {
        return cell.id === (this.currentSnake[tempI].id)
      });
    // }
  }
  var currentCellId = this.currentSnake[0].id
  this.currentSnake[0] = this.grid.find((cell) => {
    if (cell.id === currentCellId - 20){
      return cell.id === (currentCellId - 20)
      } else {
        return cell.id === (currentCellId + 380)
      }
  });
  for (let index = 1; index < this.currentSnake.length; index++){
    if (this.currentSnake[0].id === this.currentSnake[index].id){
      if (this.score.amount > this.highScore.amount){
        this.highScore.amount = this.score.amount
        localStorage.setItem('highscore', JSON.stringify(this.highScore));
      }
      this.startGame()
    }
  }
  if (this.currentSnake[0].id === this.currentApple.id){
    this.score.amount++    
    this.currentSnake.push(this.currentApple)
    this.currentApple = this.getApple()
  }
  }
  moveDown(){
    debugger
        for (let i = this.currentSnake.length-1; i>0; i--){
        var tempI = i - 1
        this.currentSnake[i] = this.grid.find((cell) => {
          return cell.id === (this.currentSnake[tempI].id)
        });
      // }
    }
    var currentCellId = this.currentSnake[0].id
    this.currentSnake[0] = this.grid.find(function(cell) {
      if (cell.id === currentCellId + 20){
        return cell.id === (currentCellId + 20)
        } else {
          return cell.id === (currentCellId - 380)
        }
    });
    
    for (let index = 1; index < this.currentSnake.length; index++){
      if (this.currentSnake[0].id === this.currentSnake[index].id){
        if (this.score.amount > this.highScore.amount){
          this.highScore.amount = this.score.amount
                  localStorage.setItem('highscore', JSON.stringify(this.highScore));
        }
        this.startGame()
      }
    }
    if (this.currentSnake[0].id === this.currentApple.id){
      this.score.amount++    
      this.currentSnake.push(this.currentApple)
      this.currentApple = this.getApple()
    }
  }
  moveLeft(){
    for (let i = this.currentSnake.length-1; i>0; i--){
        var tempI = i - 1
        this.currentSnake[i] = this.grid.find((cell) => {
          return cell.id === (this.currentSnake[tempI].id)
        });
      // }
    }
    var currentCellId = this.currentSnake[0].id
    this.currentSnake[0] = this.grid.find((cell) => {
      for (let j=0; j<this.rowArray.length; j++){
        if (currentCellId === this.rowArray[j]){
          return cell.id === this.rowArray[j]+19
        }
      }
      return cell.id === (currentCellId - 1)
    });
    for (let index = 1; index < this.currentSnake.length; index++){
      if (this.currentSnake[0].id === this.currentSnake[index].id){
        if (this.score.amount > this.highScore.amount){
          this.highScore.amount = this.score.amount
                  localStorage.setItem('highscore', JSON.stringify(this.highScore));
        }
        this.startGame()
      }
    }
    if (this.currentSnake[0].id === this.currentApple.id){
      this.score.amount++    
      this.currentSnake.push(this.currentApple)
      this.currentApple = this.getApple()
    }
  }
  moveRight(){
    debugger
    for (let i = this.currentSnake.length-1; i>0; i--){
      var tempI = i - 1
      this.currentSnake[i] = this.grid.find((cell) => {
        return cell.id === (this.currentSnake[tempI].id)
      });
  }
  var currentCellId = this.currentSnake[0].id
  this.currentSnake[0] = this.grid.find((cell) => {
    for (let j=0; j<this.rowArray.length; j++){
      debugger
      if (currentCellId - this.rowArray[j] === 19){
        return cell.id === this.rowArray[j]
      }
    }
    return cell.id === (currentCellId + 1)
  });
  for (let index = 1; index < this.currentSnake.length; index++){
    if (this.currentSnake[0].id === this.currentSnake[index].id){
      if (this.score.amount > this.highScore.amount){
        this.highScore.amount = this.score.amount
                localStorage.setItem('highscore', JSON.stringify(this.highScore));
      }
      this.startGame()
    }
  }
  if (this.currentSnake[0].id === this.currentApple.id){
    this.score.amount++    
    this.currentSnake.push(this.currentApple)
    this.currentApple = this.getApple()
  }
  }
  arrowUpRecurssion(event){
    if (this.keyPressed !== 'ArrowUp'){
      return true
    }
      if (event.key !== 'ArrowDown'){
        this.keyPressed = event.key
        this.moveUp()
        setTimeout(() =>{ this.arrowUpRecurssion(event); }, 70);
        
      }
}
arrowDownRecurssion(event){
  if (this.keyPressed !== 'ArrowDown'){
    return true
  }
    if (event.key !== 'ArrowUp'){
      this.keyPressed = event.key
      this.moveDown()
      setTimeout(() =>{ this.arrowDownRecurssion(event); }, 70);
      
    }
}
arrowRightRecurssion(event){
  if (this.keyPressed !== 'ArrowRight'){
    return true
  }
    if (event.key !== 'ArrowLeft'){
      this.keyPressed = event.key
      this.moveRight()
      setTimeout(() =>{ this.arrowRightRecurssion(event); }, 70);
      
    }
}
arrowLedtRecurssion(event){
  if (this.keyPressed !== 'ArrowLeft'){
    return true
  }
    if (event.key !== 'ArrowRight'){
      this.keyPressed = event.key
      this.moveLeft()
      setTimeout(() =>{ this.arrowLedtRecurssion(event); }, 70);
      
    }
}
  handleKeyPress(event){
    // if (!this.keyPressed){
    //   if (event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowRight' || event.key == 'ArrowLeft')
    //   this.keyPressed = event.key
    // }
    console.log(event.key)
    if (event.key === ' '){
      this.isPaused = !this.isPaused
      this.keyPressed = undefined
    }
     else if (event.key == 'ArrowUp'){
      if (this.keyPressed !== 'ArrowDown' && this.keyPressed !== 'ArrowUp'){
      this.keyPressed = event.key      
      this.arrowUpRecurssion(event)
      }
    } else if (event.key == 'ArrowDown'){
      if (this.keyPressed !== 'ArrowUp' && this.keyPressed !== 'ArrowDown'){
        this.keyPressed = event.key
        this.arrowDownRecurssion(event)
      }
    } else if (event.key == 'ArrowRight'){
      debugger
      if (this.keyPressed && this.keyPressed !== 'ArrowLeft' && this.keyPressed !== 'ArrowRight'){
        this.keyPressed = event.key
        this.arrowRightRecurssion(event)
      }
    } else if (event.key == 'ArrowLeft'){
      if (this.keyPressed !== 'ArrowRight' && this.keyPressed !== 'ArrowLeft'){
        this.keyPressed = event.key
        this.arrowLedtRecurssion(event)
      }
    }
  }
  checkStyle(id){
    debugger
    for (let i=0; i<this.currentSnake.length; i++){
      if (this.currentSnake[0].id === id){
        return "green"
      }
      else if (this.currentSnake[i].id === id){
        return "linear-gradient(darkgreen, black)";
      } else {
        if (this.currentApple.id === id){
          return "linear-gradient(red, black)";
        }
      }      
    }

  }
}
