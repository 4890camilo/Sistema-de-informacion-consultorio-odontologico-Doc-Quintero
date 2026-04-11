import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  roles: string[];
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(user: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.router.navigate(['/pacientes/list']);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveRoles(roles: string[]): void {
    if (roles && roles.length) {
      localStorage.setItem('roles', JSON.stringify(roles));
    } else {
      localStorage.removeItem('roles');
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    if (!roles) {
      return [];
    }
    try {
      return JSON.parse(roles);
    } catch {
      return [];
    }
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  hasAnyRole(requiredRoles: string[]): boolean {
    return requiredRoles.some(role => this.hasRole(role));
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
