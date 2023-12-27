import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from './../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent implements OnInit {
  game!: Game;
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  async newGame() {
    this.game = new Game();
    await addDoc(this.getGamesRef(), this.game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }
}
