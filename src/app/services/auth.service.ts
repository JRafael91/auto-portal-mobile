import { Injectable } from '@angular/core'
import { IAuth } from '../interfaces/user';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { AlertService } from './alert.service';
import { DataState } from '../utils/data.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = environment.API_URL;

  dataState: DataState;
  
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.dataState = new DataState();
  }


  isAuthenticated(): boolean {
    return this.dataState.has('token');
  }

  getToken(): string {
    return this.dataState.get('token');
  }

  login(data: IAuth) {
    return this.http.post(`${this.API_URL}/login`, data)
    .pipe(
      tap((data: any) => {
        this.dataState.set('name', data.technic.name);
        this.dataState.set('username', data.technic.username);
        this.dataState.set('token', data.token);
      }),
      catchError((err) => {
        throw this.alertService.error('Error', `${err.error.message}`)
      })
    );
  }


  logout() {
    return this.http.post(`${this.API_URL}/logout`, {})
    .pipe(
      tap(() => {
        this.dataState.remove('name');
        this.dataState.remove('username');
        this.dataState.remove('token');
      }),
      catchError((err) => {
        throw this.alertService.error('Error', `${err.error.message}`)
      })
    )
  }
}