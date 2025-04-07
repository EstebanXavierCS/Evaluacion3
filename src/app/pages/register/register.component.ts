import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Propiedades
  error: boolean = false;
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  // Formulario reactivo con validaciones
  form = this.fb.nonNullable.group({
    email: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  // Método para registrar usuario
  onSubmit() {
    if (this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      this.error = true;
      return;
    }

    const rawForm = this.form.getRawValue();
    this.authService.register(rawForm.email, rawForm.password).subscribe({
      next: () => {
        alert('Registro exitoso. Redirigiendo al login...');
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.error = true;
        console.error('Error en el registro:', error);
      },
    });
  }
}
