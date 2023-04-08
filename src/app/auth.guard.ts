import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ServiceCallAlarmComponent } from './components/service-call-alarm/service-call-alarm.component';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(sessionStorage.getItem("user") || '{}');
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

    if (this.authService.isLoggedIn() && user && isAdmin) {

     
      return true;
    }

    // User is not authorized to access the route, redirect to login page
    sessionStorage.clear()
    this.router.navigate(['/login']);
    return false;
  }
}
