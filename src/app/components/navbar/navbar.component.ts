import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
}