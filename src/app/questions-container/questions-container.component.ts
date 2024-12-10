import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ScorePageComponent } from '../score-page/score-page.component';

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
  ],
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.css'],
})
export class QuestionsContainerComponent implements OnInit {
  @Input() public subject = '';
  public quizzes: Quiz[] = [];
  @Input() public selectedQuiz: Quiz = {
    title: '',
    icon: '',
    questions: [],
  };
  public currentQuestionIndex = 0;
  public selectedAnswer: string | null = null;
  public errorMessage: string | null = null;

  public quizCompleted = false;
  public correctAnswers = 0;

  constructor(readonly http: HttpClient) {}

  public ngOnInit() {
    this.http.get<QuizData>('/data.json').subscribe((data) => {
      this.quizzes = data.quizzes;
      this.filterQuiz();
    });
  }

  public ngOnChanges() {
    if (this.subject) {
      this.filterQuiz();
    }
  }

  private filterQuiz() {
    this.selectedQuiz = this.quizzes.find(
      (quiz) => quiz.title === this.subject
    ) || {
      title: '',
      icon: '',
      questions: [],
    };
  }

  public get isLastQuestion() {
    return this.selectedQuiz
      ? this.currentQuestionIndex === this.selectedQuiz.questions.length - 1
      : false;
  }

  public selectOption(option: string) {
    this.selectedAnswer = option;
    this.errorMessage = null;

    if (this.isCorrect(option)) {
      this.correctAnswers++;
    }
  }

  public isCorrect(option: string) {
    return (
      this.selectedQuiz.questions[this.currentQuestionIndex].answer === option
    );
  }

  public getOptionLabel(index: number) {
    return String.fromCharCode(65 + index);
  }

  public isOptionDisabled() {
    return this.selectedAnswer !== null;
  }

  public handleSubmit() {
    if (this.selectedAnswer) {
      if (!this.isLastQuestion) {
        this.currentQuestionIndex++;
        this.selectedAnswer = null;
      } else {
        this.quizCompleted = true;
      }
    } else {
      this.errorMessage = 'Please select an answer';
    }
  }
}
