import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  @Input() name: string = '';
  @Input() image: string = '1.webp';
  @Input() playerActive: boolean = false;

  constructor() { }

}
