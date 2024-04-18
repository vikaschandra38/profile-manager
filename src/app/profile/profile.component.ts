import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Profile } from '../models/profile';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  @Input() profile!: Profile;
  @Output() deleteProfileAction = new EventEmitter<Profile>();
  @Output() editProfileAction = new EventEmitter<Profile>();

  constructor() {}

  deleteProfile() {
    this.deleteProfileAction.emit(this.profile);
  }

  editProfile() {
    this.editProfileAction.emit(this.profile);
  }

  ngOnInit() {
    console.log(this.profile);
  }
}
