import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-dialoag-add-player',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialoag-add-player.component.html',
  styleUrl: './dialoag-add-player.component.scss'
})
export class DialoagAddPlayerComponent {
  name: string = '';

  constructor(private dialogRef: MatDialogRef<DialoagAddPlayerComponent>) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
