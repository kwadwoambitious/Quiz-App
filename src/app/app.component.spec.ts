import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { QuestionsContainerComponent } from './questions-container/questions-container.component';
import { ScorePageComponent } from './score-page/score-page.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,  // Use AppComponent as an imported standalone component
        StartMenuComponent,
        QuestionsContainerComponent,
        ScorePageComponent,
        CommonModule,
        HttpClientModule
      ],
      // Mock any necessary services if needed
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  // Test 1: Component creation and initial state
  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "quiz-application"', () => {
    expect(component.title).toBe('quiz-application');
  });

  it('should have an empty subjectSelected initially', () => {
    expect(component.subjectSelected).toBe('');
  });

  // Test 2: Testing the onSubjectSelected method
  it('should update the subjectSelected when onSubjectSelected is called', () => {
    const subject = 'HTML';
    component.onSubjectSelected(subject);
    expect(component.subjectSelected).toBe(subject);
  });

  // Test 3: Testing the interaction with the HTML template
  it('should display the subject selected in the HTML', () => {
    component.subjectSelected = 'HTML';  // Set a subject
    fixture.detectChanges();  // Trigger change detection to update the view

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('quiz-application');
    expect(compiled.querySelector('.subject-selected')?.textContent).toContain('HTML');
  });
});
