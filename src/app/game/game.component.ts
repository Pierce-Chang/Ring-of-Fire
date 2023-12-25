import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './../player/player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { DialoagAddPlayerComponent } from '../dialoag-add-player/dialoag-add-player.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Game } from './../../models/game';


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBc7ukxaxeuUqLMnRQ-xcuaqQJS8HokR6w",
  authDomain: "ring-of-fire-ecb74.firebaseapp.com",
  projectId: "ring-of-fire-ecb74",
  storageBucket: "ring-of-fire-ecb74.appspot.com",
  messagingSenderId: "778799504260",
  appId: "1:778799504260:web:d8fdbf91a0aa70a79b1bd1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    GameInfoComponent,
    DialoagAddPlayerComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: any = '';
  game: Game;

  constructor(public dialog: MatDialog) {
    this.game = new Game();
  }
  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log('New card:', this.currentCard);
      console.log(this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialoagAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}