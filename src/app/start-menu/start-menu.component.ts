import { Component, Output, EventEmitter } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { QuestionsContainerComponent } from '../questions-container/questions-container.component';


@Component({
  selector: 'app-start-menu',
  standalone: true,
  imports: [HeaderComponent, QuestionsContainerComponent],
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css'],
})
export class StartMenuComponent {
  @Output() subjectSelected = new EventEmitter<string>();  // EventEmitter to send selected subject to parent

  // Emit the selected subject when a subject is clicked
  selectSubject(subject: string) {
    console.log('Selected Subject:', subject);
    this.subjectSelected.emit(subject);
  }
}
