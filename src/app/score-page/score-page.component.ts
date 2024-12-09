import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css',
})
export class ScorePageComponent {
  @Input() correctAnswers: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() subjectName: string = '';
  @Input() subjectImage: string = '';
}
