import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  this.pickCardAnimation = false;

  constructor() {}

  ngOnInit(): void {
  }

  takeCard() {
    this.pickCardAnimation = true;
  }
}
