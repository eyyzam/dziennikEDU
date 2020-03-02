import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  sectionTitle: string = "Zaloguj się";
  isLoading: boolean = false;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      userEmail: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      userPassword: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onUserLogin() {
    if (this.loginForm.invalid) return;
    this.authService
      .SignIn(this.loginForm.value.userEmail, this.loginForm.value.userPassword)
      .then(() => {
        if (this.authService.isLoggedIn) {
          this.router.navigate(["oceny"]);
        }
      });
  }

  continueWithGoogle() {
    this.authService.GoogleAuth();
  }
}
