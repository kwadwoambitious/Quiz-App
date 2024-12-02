import { CommonModule } from '@angular/common';
import { Component, Input, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() subjectName: string = '';  
  @Input() subjectImage: string = '';
  isDarkMode = false; 

  constructor() {}

  ngOnInit(): void {
    // Apply the correct theme on component load based on the stored state
    this.applyTheme();
  }

  // Method to apply the theme based on the checkbox value
  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // Watch for changes to the theme and apply them
  toggleTheme() {
    this.applyTheme();
  }

  // Optional: Load the user's theme preference from localStorage
  // ngOnInit() {
  //   const savedTheme = localStorage.getItem('theme');
  //   if (savedTheme) {
  //     this.isDarkMode = savedTheme === 'dark';
  //   }
  // }

  // ngOnChanges() {
  //   localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  // }
  
}
