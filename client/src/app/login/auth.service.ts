import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private token: string = null

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user).pipe(
      tap(({ token }) => {
        localStorage.setItem('auth-token', token)
        this.setToken(token)
      })
    )

  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isLogined(): boolean {
    return !!this.token
  }

  logout(){
    this.setToken(null)
    localStorage.clear()
  }

}