import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {



  async getRandomCharacters(): Promise<Character[]> {

    const page = Math.floor(Math.random() * 5) + 1
    const rawResponse = await fetch(`${environment.jikanAPI}/top/characters/${page}`)
    const charactersJson: Character[] = (await rawResponse.json()).top

    const pickedNumbers: number[] = []

    const characters: Character[] = []

    for (let i = 0; i < 4; i++) {

      let number = 0

      while (true) {
        number = Math.floor(Math.random() * charactersJson.length)
        if (pickedNumbers.length == 0 || !pickedNumbers.includes(number))
          break;
      }
      
      pickedNumbers.push(number)
      characters.push(charactersJson[number])
    }

    return characters

  }

}
