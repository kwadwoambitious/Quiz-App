// score-page.component.ts
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule, HttpClientModule],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css',
})
export class ScorePageComponent {
  @Input() correctAnswers: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() subjectName: string = '';  
  @Input() subjectImage: string = '';

}
