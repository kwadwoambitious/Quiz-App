import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ScorePageComponent } from '../score-page/score-page.component';
import { StartMenuComponent } from '../start-menu/start-menu.component';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  title: string;
  icon: string;
  questions: Question[];
}

interface QuizData {
  quizzes: Quiz[];
}

@Component({
  selector: 'app-questions-container',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HttpClientModule,
    ScorePageComponent,
    StartMenuComponent,
  ],
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.css'],
})
export class QuestionsContainerComponent implements OnInit {
  @Input() subject: string = '';
  quizzes: Quiz[] = [];
  @Input() selectedQuiz: Quiz = {
    title: '',
    icon: '',
    questions: [],
  };
  currentQuestionIndex: number = 0;
  selectedAnswer: string | null = null;
  errorMessage: string | null = null;

  quizCompleted: boolean = false; // State to track if the quiz is completed
  correctAnswers: number = 0; // To track the number of correct answers

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<QuizData>('/data.json').subscribe((data) => {
      this.quizzes = data.quizzes;
      this.filterQuiz();
    });
  }

  ngOnChanges(): void {
    if (this.subject) {
      this.filterQuiz();
    }
  }

  // Method to start the quiz
  startQuiz() {
    this.quizCompleted = false;
    this.correctAnswers = 0; // Reset score and other variables if needed
  }
  // Method to complete the quiz
  completeQuiz(correctAnswers: number) {
    this.correctAnswers = correctAnswers;
    this.quizCompleted = true;
  }

  // Method to handle play again event
  onPlayAgain() {
    this.startQuiz(); // Reset quiz and go back to start menu
  }

  private filterQuiz(): void {
    this.selectedQuiz = this.quizzes.find(
      (quiz) => quiz.title === this.subject
    ) || {
      title: '',
      icon: '',
      questions: [],
    };
  }

  get isLastQuestion(): boolean {
    return this.selectedQuiz
      ? this.currentQuestionIndex === this.selectedQuiz.questions.length - 1
      : false;
  }

  selectOption(option: string): void {
    this.selectedAnswer = option;
    this.errorMessage = null;

    // Increment the correct answer count if the option is correct
    if (this.isCorrect(option)) {
      this.correctAnswers++;
    }
  }

  isCorrect(option: string): boolean {
    return (
      this.selectedQuiz.questions[this.currentQuestionIndex].answer === option
    );
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  isOptionDisabled(): boolean {
    return this.selectedAnswer !== null;
  }

  handleSubmit(): void {
    if (this.selectedAnswer) {
      if (!this.isLastQuestion) {
        this.currentQuestionIndex++;
        this.selectedAnswer = null;
      } else {
        // Mark quiz as completed
        this.quizCompleted = true;
      }
    } else {
      this.errorMessage = 'Please select an answer';
    }
  }
}
