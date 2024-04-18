import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Profile, ProfileDialog } from '../models/profile';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css',
})
export class ProfileFormComponent {
  constructor(
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialog,
    private fb: FormBuilder
  ) {
    if(this.data.action === 'EDIT'){
      this.profileForm.patchValue(this.data.profile);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  profileForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: [''],
    email: ['', [Validators.required, Validators.email]],
  });

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get phoneno() {
    return this.profileForm.get('phoneno');
  }

  get email() {
    return this.profileForm.get('email');
  }
}
