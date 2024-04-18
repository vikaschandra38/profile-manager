import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './app/header/header.component';
import { MainComponent } from './app/main/main.component';
import { provideHttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MainComponent],
  template: `
    <app-header />
    <app-main />
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: APP_BASE_HREF, useValue: '/profile-manager/' },
  ],
});
