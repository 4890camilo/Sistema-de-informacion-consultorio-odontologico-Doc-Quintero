import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }
 
  onSubmit(): void {
    const emailStatus = this.registerForm.get('email')?.valid ? '✓' : '✗';
    const passwordStatus = this.registerForm.get('password')?.valid ? '✓' : '✗';
    const roleStatus = this.registerForm.get('role')?.valid ? '✓' : '✗';
    
    this.errorMessage = `Email ${emailStatus} | Pass ${passwordStatus} | Rol ${roleStatus}`;
    
    if (this.registerForm.valid) {
      this.errorMessage = '';
      this.successMessage = '';
      const formValue = this.registerForm.value;
      const dto = {
        email: formValue.email,
        password: formValue.password,
        roles: [formValue.role]
      };

      this.authService.register(dto).subscribe({
        next: (response: any) => {
          this.successMessage = response?.message || 'Registro exitoso. Ingresa para continuar.';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        },
        error: (error: any) => {
          this.errorMessage = error?.error?.message || 'Fallo en la conexión con el servidor.';
        }
      });
    } else {
      this.errorMessage = `Campos inválidos: Email ${emailStatus} | Pass ${passwordStatus} | Rol ${roleStatus}`;
    }
  }
}