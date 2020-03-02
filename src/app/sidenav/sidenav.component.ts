import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Roles } from "../auth/models/roles.model";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit, OnDestroy {
  fSub: Subscription;
  userRoles: Roles;
  isLoading: boolean = true;
  everythingSet: boolean = false;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    // if (this.auth.isLoggedIn) {
    //   this.RolesInit();
    //   if (this.everythingSet) {
    //     setTimeout(() => {
    //       this.RolesInit();
    //     }, 500);
    //   }
    // }
    // } else {
    //   setTimeout(() => {
    //   })
    //   this.fSub.unsubscribe();
    //   this.userRoles = undefined;
    //   this.isLoading = true;
  }

  // setStatus() {
  //   this.isLoading = true;
  //   this.userRoles = null;
  // }

  RolesInit() {
    // this.fSub = this.auth.getAuthState.subscribe(user => {
    //   if (user) {
    //     this.everythingSet = true;
    //     this.auth.userProfileOutsideSubscription(user.uid).subscribe(x => {
    //       if (x) {
    //         x.subscribe(a => {
    //           if (a) {
    //             this.userRoles = {
    //               student: a.roles.student,
    //               nauczyciel: a.roles.nauczyciel,
    //               admin: a.roles.admin
    //             };
    //             this.isLoading = false;
    //           }
    //         });
    //       }
    //     });
    //   }
    // });
  }
  // ngOnInit() {
  // this.userRolesSub = this.auth.userDBRecord.subscribe(x => {
  //   console.log(x);
  //   this.userRoles = x.roles;
  //   console.log(this.userRoles);
  //   this.isLoading = false;
  // });
  // this.auth.getAuthState.subscribe(user => {
  //   if (user) {
  //     this.userRolesSub = this.auth.aa.subscribe(x => {
  //       x.subscribe(a => {
  //         this.userRoles = {
  //           student: a.roles.student,
  //           nauczyciel: a.roles.nauczyciel,
  //           admin: a.roles.admin
  //         };
  //         this.isLoading = false;
  //       });
  //     });
  //   }
  // });
  // }

  ngOnDestroy() {
    //   this.fSub.unsubscribe();
  }
}
