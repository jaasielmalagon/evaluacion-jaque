import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardiaGuard implements CanActivate {

  constructor(public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean |
      UrlTree> |
    Promise<boolean |
      UrlTree> |
    boolean |
    UrlTree {
    let session = JSON.parse(localStorage.getItem('session'))
    console.log(session)
    if (session) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
