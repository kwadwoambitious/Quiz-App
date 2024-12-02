import { Component } from '@angular/core';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { QuestionsContainerComponent } from './questions-container/questions-container.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScorePageComponent } from "./score-page/score-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StartMenuComponent, QuestionsContainerComponent, HttpClientModule, ScorePageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'quiz-application';

  subjectSelected: string = '';  // Holds the selected subject

  // This method is called when a subject is selected in the start menu
  onSubjectSelected(subject: string) {
    this.subjectSelected = subject;  // Set the selected subject
  }
}
