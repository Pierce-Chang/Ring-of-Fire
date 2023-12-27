import { Component, OnInit, inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './../player/player.component';
import { PlayerMobileComponent } from './../player-mobile/player-mobile.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { DialoagAddPlayerComponent } from '../dialoag-add-player/dialoag-add-player.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Game } from './../../models/game';
import { Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, query, orderBy, where, limit, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    PlayerMobileComponent,
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

  game!: Game;
  gameId!: string;
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.subGamesRef();
      console.log(params)
    })
  }

  async subGamesRef() {
    const q = this.getSingleDocRef(this.gameId);
    return onSnapshot(q, (element) => {
      let gameData = element.data();
      console.log('game update', gameData);
      this.game.currentPlayer = gameData!['currentPlayer'];
      this.game.playedCards = gameData!['playedCards'];
      this.game.players = gameData!['players'];
      this.game.stack = gameData!['stack'];
      this.game.pickCardAnimation = gameData!['pickCardAnimation'];
      this.game.currentCard = gameData!['currentCard'];
    });
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(docId: string) {
    return doc((this.getGamesRef()), docId);
  }

  newGame() {
    this.game = new Game();
  }

  async addGame() {
    await addDoc(this.getGamesRef(), this.game.toJson());
  }

  async safeGame() {
    await updateDoc(this.getSingleDocRef(this.gameId), this.game.toJson());
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      console.log('New card:', this.game.currentCard);
      console.log(this.game);
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.safeGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.safeGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialoagAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.safeGame();
      }
    });
  }
}