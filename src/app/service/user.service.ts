import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'http://localhost:3000/users';

  // State
  list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getAll(): void {
    this.http.get<User[]>(this.apiUrl).subscribe(
      users => this.list$.next(users)
    );
  }

  get(user: User): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${user.id}`);
  }

  create(user: User): void {
    this.http.post<User>(this.apiUrl, user).subscribe(
      () => this.getAll()
    );
  }

  update(user: User): void {
    this.http.patch<User>(`${this.apiUrl}/${user.id}`, user).subscribe(
      () => this.getAll()
    );
  }

  remove(user: User): void {
    this.http.delete<User>(`${this.apiUrl}/${user.id}`).subscribe(
      () => this.getAll()
    );
  }

}
