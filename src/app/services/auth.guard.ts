import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}
  role: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const currentUser = this.user.getUser();
    const user = this.user.getUser();
    this.role = user.role_fld;

    if (!this.user.isLoggedIn()) {
      this.user.refreshUser();
      if(this.role !== "admin"){
        this.router.navigateByUrl('/user-login');
      }else{
        this.router.navigateByUrl('/admin-login');
      }
      return false;
    } else {
    }
    return true;
  }
}
