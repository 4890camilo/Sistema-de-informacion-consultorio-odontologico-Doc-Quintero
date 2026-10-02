import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
 
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
 
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
 
      this.authService.login(this.loginForm.value)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe({
          next: (response) => {
            this.authService.saveToken(response.token);
            this.authService.saveRoles(response.roles || []);

            const roles = response.roles || [];
            if (roles.includes('ADMINISTRADOR') || roles.includes('ADMIN')) {
              this.router.navigate(['/pacientes/list']);
            } else if (roles.includes('AUXILIAR')) {
              this.router.navigate(['/citas/list']);
            } else if (roles.includes('ODONTOLOGO')) {
              this.router.navigate(['/historiaclinica/list']);
            } else {
              this.router.navigate(['/pacientes/list']);
            }
          },
          error: (error) => {
            this.errorMessage = 'Credenciales inválidas. Inténtalo de nuevo.';
          }
        });
    }
  }
}