import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import { map, take, takeLast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profilesURL = 'https://dummyjson.com/users';
  constructor(private http: HttpClient) {}

  getProfiles() {
    return this.http.get(this.profilesURL).pipe(
      map((response: any) => {
        return response['users'].slice(0, 5);
      })
    );
  }

  addProfile(profile: Profile) {
    return this.http.post(
      'https://dummyjson.com/users/add',
      JSON.stringify(profile)
    );
  }

  editProfile(profile: Profile) {
    return this.http.put(`https://dummyjson.com/users/${profile.id}`, profile);
  }

  deleteProfile(id: number) {
    return this.http.delete(`https://dummyjson.com/users/${id}`);
  }

  setLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
