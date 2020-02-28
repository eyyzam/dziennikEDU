import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { authService } from "../auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  sectionTitle: string = "Rejestacja uczniów";
  isLoading: boolean = false;
  registrationForm: FormGroup;

  constructor(private authService: authService) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      userEmail: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      userPassword: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onUserRegister() {
    if (this.registrationForm.invalid) return;
    this.authService.SignUp(
      this.registrationForm.value.userEmail,
      this.registrationForm.value.userPassword
    );
  }

  continueWithGoogle() {
    this.authService.GoogleAuth();
  }
}
