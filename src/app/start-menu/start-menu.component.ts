import { Component, Output, EventEmitter } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-start-menu',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css'],
})
export class StartMenuComponent {
  @Output() public subjectSelected = new EventEmitter<string>();

  public selectSubject(subject: string) {
    this.subjectSelected.emit(subject);
  }
}
