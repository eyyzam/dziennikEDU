import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { authService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  sectionTitle: string = "Zaloguj się";
  isLoading: boolean = false;
  loginForm: FormGroup;

  constructor(private authService: authService) {}

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

  onUserRegister() {
    if (this.loginForm.invalid) return;
    this.authService.SignIn(
      this.loginForm.value.userEmail,
      this.loginForm.value.userPassword
    );
  }

  continueWithGoogle() {
    this.authService.GoogleAuth();
  }
}
