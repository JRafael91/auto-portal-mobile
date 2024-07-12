import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IAuth } from '../interfaces/user';
import { LoadingService } from '../services/loading.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly routerExtensions = inject(RouterExtensions);
  private readonly loadingService = inject(LoadingService)

  authForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    if(!this.authForm.valid) return this.authForm.markAllAsTouched();
    
    this.loadingService.show('Cargando...');
    this.authService.login(this.authForm.value as IAuth).subscribe({
      next: () => {
        this.loadingService.hide();
        this.routerExtensions.navigate(['/home'], { clearHistory: true });
      },
      error: (err) => this.loadingService.hide(),
    });

  }

}