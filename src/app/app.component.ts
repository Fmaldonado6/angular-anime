import { CharactersService } from './services/characters.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Character } from './models/models';

import * as M from 'materialize-css';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  Status: typeof Status = Status
  currentStatus: Status = Status.loading

  options: Character[] = []
  correct: number = 0

  score: number = 0
  bestScore: number = 0
  modal: any

  constructor(
    private charactersService: CharactersService,
  ) { }
  ngAfterViewInit(): void {
    var elems = document.querySelector('.modal');
    this.modal = M.Modal.init(elems!!, { dismissible: false });
  }

  ngOnInit(): void {
    this.getScore()
    this.getRandomCharacter()
  }


  async getRandomCharacter() {
    this.currentStatus = Status.loading
    try {
      do {
        this.options = await this.charactersService.getRandomCharacters()
        this.correct = this.getCorrectCharacterIndex()
      }
      while (this.correct == -1)
      this.charactersService.addShownCharacter(this.options[this.correct])
      this.currentStatus = Status.loaded
    } catch (error) {
      console.log(error)
      this.currentStatus = Status.error
    }
  }

  getCorrectCharacterIndex(): number {

    let randomNumber = Math.floor(Math.random() * 4)
    let character = this.options[randomNumber]

    if (!this.charactersService.charactersShown.includes(character.mal_id))
      return randomNumber

    for (randomNumber = 0; randomNumber < 4; randomNumber++) {
      character = this.options[randomNumber]

      if (!this.charactersService.charactersShown.includes(character.mal_id))
        return randomNumber
    }

    return -1

  }

  selectAnswer(index: number) {
    if (index == this.correct) {
      this.getRandomCharacter()
      this.score++

      if (this.score > this.bestScore) {
        this.bestScore = this.score
        this.saveScore()
      }
    } else
      this.openGameOverDialog()

  }

  saveScore() {
    localStorage.setItem("bestScore", JSON.stringify(this.score))
  }

  getScore() {
    const bestScore = localStorage.getItem("bestScore")
    if (bestScore)
      this.bestScore = Number.parseInt(bestScore)
  }

  openGameOverDialog() {
    this.modal.open()
  }

  reset() {
    this.score = 0
    this.modal.close()
    this.getRandomCharacter()
    this.charactersService.resetShownCharacters()
  }


}

enum Status {
  loading,
  loaded,
  error
}
