export interface Profile {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface ProfileDialog {
  action: 'EDIT' | 'ADD';
  profile: Profile;
}
