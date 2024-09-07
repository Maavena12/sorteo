import { Component } from '@angular/core';

interface Team {
  name: string;
  rank: number;
}

@Component({
  selector: 'app-champions-league-format',
  templateUrl: './champions-league-format.component.html',
  styleUrls: ['./champions-league-format.component.css']
})
export class ChampionsLeagueFormatComponent {
  equipos: Team[] = [];
  topTeams: Team[] = [];
  roundOf16Teams: Team[] = [];
  eliminatedTeams: Team[] = [];
  octavosMatches: any[] = [];
  cuartosMatches: any[] = [];
  semifinalMatches: any[] = [];
  finalMatch: any;

  constructor() {
    this.generateTeams();
    this.segregateTeams();
    this.drawRoundOf16();
    this.drawQuarterFinals();
    this.drawSemiFinals();
    this.drawFinal();
  }

  generateTeams() {
    for (let i = 1; i <= 36; i++) {
      this.equipos.push({ name: `Team ${i}`, rank: i });
    }
  }

  segregateTeams() {
    this.topTeams = this.equipos.slice(0, 8);
    this.roundOf16Teams = this.equipos.slice(8, 24);
    this.eliminatedTeams = this.equipos.slice(24);
  }

  drawRoundOf16() {
    // Sorteo de partidos
    const shuffledRoundOf16 = this.shuffleArray([...this.roundOf16Teams]);
    for (let i = 0; i < shuffledRoundOf16.length; i += 2) {
      this.octavosMatches.push({
        team1: shuffledRoundOf16[i],
        team2: shuffledRoundOf16[i + 1]
      });
    }
  }

  drawQuarterFinals() {
    // Simulamos que los 8 ganadores de la Ronda de 16 avanzan
    const winners = [...this.topTeams, ...this.octavosMatches].slice(0, 16);
    const shuffledWinners = this.shuffleArray(winners);
    
    for (let i = 0; i < shuffledWinners.length; i += 2) {
      this.cuartosMatches.push({
        team1: shuffledWinners[i],
        team2: shuffledWinners[i + 1]
      });
    }
  }

  drawSemiFinals() {
    const semiFinalWinners = this.shuffleArray([...this.cuartosMatches].flat()).slice(0, 8);
    
    for (let i = 0; i < semiFinalWinners.length; i += 2) {
      this.semifinalMatches.push({
        team1: semiFinalWinners[i],
        team2: semiFinalWinners[i + 1]
      });
    }
  }

  drawFinal() {
    const finalTeams = this.shuffleArray([...this.semifinalMatches].flat()).slice(0, 2);
    this.finalMatch = {
      team1: finalTeams[0],
      team2: finalTeams[1]
    };
  }

  shuffleArray(array: Team[]) {
    // Barajar equipos para el sorteo
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}