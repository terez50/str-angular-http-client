import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  get(user: User): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${user.id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  update(user: User): Observable<User> {
    // const id: number = user.id || 0;
    // delete user.id;
    // return this.http.patch<User>(`${this.apiUrl}/${id}`, user);
    return this.http.patch<User>(`${this.apiUrl}/${user.id}`, user);
  }
  
  remove(user: User): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${user.id}`);
  }

}
