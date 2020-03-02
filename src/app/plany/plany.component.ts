import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { KlasaService } from "../klasa/klasa.service";
import { Klasa } from "../models/klasa.model";

@Component({
  selector: "app-plany",
  templateUrl: "./plany.component.html",
  styleUrls: ["./plany.component.css"]
})
export class PlanyComponent implements OnInit {
  sectionTitle: string = "Zarządzanie planami zajęć";
  classesArraySub: Subscription;
  classArray: Klasa[];

  constructor(public auth: AuthService, private classService: KlasaService) {}

  ngOnInit() {
    this.classesArraySub = this.classService.getClasses().subscribe(c => {
      this.classArray = [...c];
    });
  }

  getClass(className: string) {}
}
