import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css',
})
export class ScorePageComponent {
  @Input() public correctAnswers = 0;
  @Input() public totalQuestions = 0;
  @Input() public subjectName = '';
  @Input() public subjectImage = '';
}
