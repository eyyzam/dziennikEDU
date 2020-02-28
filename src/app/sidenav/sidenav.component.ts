import { Component, OnInit, OnDestroy } from "@angular/core";
import { authService } from "../auth/auth.service";
import { Roles } from "../auth/models/roles.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit, OnDestroy {
  userRolesSub: Subscription;
  userRoles: Roles;
  isLoading: boolean = true;

  constructor(public auth: authService) {}

  ngOnInit() {
    // this.userRolesSub = this.auth.userDBRecord.subscribe(x => {
    //   console.log(x);
    //   this.userRoles = x.roles;
    //   console.log(this.userRoles);
    //   this.isLoading = false;
    // });
    setTimeout(() => {
      this.userRolesSub = this.auth.aa.subscribe(x => {
        x.subscribe(a => {
          this.userRoles = a.roles;
          this.isLoading = false;
        });
      });
    }, 500);
  }

  ngOnDestroy() {
    this.userRolesSub.unsubscribe();
  }
}
