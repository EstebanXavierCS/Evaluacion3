import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  message: string | null = null;
  error: boolean = false;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { email } = this.form.getRawValue();
    this.authService.resetPassword(email).subscribe({
      next: () => {
        this.message = 'Correo enviado. Revisa tu bandeja de entrada.';
        this.error = false;
      },
      error: (error) => {
        this.error = true;
        this.message = 'Error al enviar el correo. Verifica el email.';
        console.error('Error:', error);
      },
    });
  }
}
