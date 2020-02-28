import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { authService } from "../auth.service";
import { tap, map, take } from "rxjs/operators";

@Injectable()
export class StudentGuard implements CanActivate {
  constructor(private auth: authService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.aa.pipe(
      map(userObs => {
        userObs.pipe(
          map(secondObs =>
            secondObs && secondObs.roles.student ? true : false
          ),
          tap(isStudent => {
            return true;
          })
        );
        return false;
      })
    );
    // return this.auth.userDBRecord.pipe(
    //   take(1),
    //   map(user => (user && user.roles.student ? true : false)),
    //   tap(isStudent => {
    //     if (!isStudent) {
    //       return of(true);
    //     }
    //     return of(false);
    //   })
    // );
  }
}
