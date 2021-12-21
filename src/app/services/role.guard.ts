import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  role: any;

  constructor(private _us:UserService, private _as:AlertService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const user = this._us.getUser();
      this.role = user.role_fld;

      if(this.role !== "admin"){
        this._as.error('Authentication Error: You are not authorized to access the admin page', 'options.autoClose');
        this.router.navigateByUrl('/admin-login');
        return false;
      }
      return true;
  }
  
}
