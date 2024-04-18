import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [ProfileComponent, AsyncPipe, MatIconModule, MatButtonModule],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.css',
})
export class ProfileListComponent implements OnInit {
  profiles!: Profile[];
  duration = 2;
  constructor(
    private profileService: ProfileService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.profileService.getProfiles().subscribe((response) => {
      this.profiles = response;
    });
  }

  addProfile() {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      data: {
        profile: { firstName: '', lasttName: '', email: '', phoneno: '' },
        action: 'ADD',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const { firstName, lastName, email, phone } = result;
      this.profileService
        .addProfile({ firstName, lastName, email, phone })
        .subscribe((response: any) => {
          if (response['id'] !== null) {
            const { id } = response;
            this.profiles.unshift({ id, firstName, lastName, email, phone });
            this._snackBar.open('Profile created successfully', 'OK', {
              duration: this.duration * 1000,
            });
            this.profileService.setLocalStorage('profiles', this.profiles);
          }
        });
    });
  }

  deleteProfile(profile: Profile) {
    this.profileService
      .deleteProfile(profile.id!)
      .subscribe((response: any) => {
        if (response['isDeleted']) {
          this.profiles = this.profiles.filter(
            (item) => item.id !== profile.id
          );
          this.profileService.setLocalStorage('profiles', this.profiles);
          this._snackBar.open('Profile deleted successfully', 'OK', {
            duration: this.duration * 1000,
          });
        }
      });
  }

  editProfile(profile: Profile) {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      data: {
        profile: profile,
        action: 'EDIT',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const { firstName, lastName, email, phone } = result;
      this.profileService
        .editProfile({ id: profile.id, firstName, lastName, email, phone })
        .subscribe((response: any) => {
          if (response['id'] !== null) {
            let index = this.profiles.findIndex(
              (item) => item.id === profile.id
            );
            this.profiles[index] = {
              id: profile.id,
              firstName,
              lastName,
              email,
              phone,
            };
            this._snackBar.open('Profile updated successfully', 'OK', {
              duration: this.duration * 1000,
            });
            this.profileService.setLocalStorage('profiles', this.profiles);
          }
        });
    });
  }
}
