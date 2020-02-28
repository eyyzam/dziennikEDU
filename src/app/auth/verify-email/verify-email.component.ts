import { Component, OnInit } from "@angular/core";
import { authService } from "../auth.service";

@Component({
  selector: "app-verify",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.css"]
})
export class VerifyEmailComponent {
  sectionTitle: string = "Zweryfikuj swój Email";
  isLoading: boolean = false;

  constructor(private authService: authService) {}
}
