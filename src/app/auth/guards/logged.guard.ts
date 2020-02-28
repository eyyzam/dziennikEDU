import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { authService } from "../auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoggedInGuard implements CanActivate {
  constructor(public authService: authService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(["/user/login"]);
      window.alert("Musisz być zalogowany, żeby uzyskać dostęp do tej strony");
    }
    return true;
  }
}
