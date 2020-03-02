import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { KlasaService } from "./klasa.service";
import { Klasa } from "../models/klasa.model";
import { Uczen } from "../models/uczen.model";
import { MatTableDataSource } from "@angular/material";
import { uczenService } from "../uczniowie/uczniowie.service";

@Component({
  selector: "app-klasa",
  templateUrl: "./klasa.component.html",
  styleUrls: ["./klasa.component.css"]
})
export class KlasaComponent implements OnInit {
  sectionTitle: string = "Zarządzanie Klasami";
  newClassFormVisible: boolean = false;
  classSelected: boolean = false;
  classForm: FormGroup;
  classArray: Klasa[];
  selectedClassID;

  // Display students
  uczenArraySub: Subscription;
  uczenArray: Uczen[];
  displayedColumns: string[] = [
    "imie",
    "nazwisko",
    "klasa",
    "wychowawca",
    "akcje"
  ];
  dataSource;

  // X
  fetchedClassParameters: Klasa;
  fetchedClassStudents: Uczen[];

  classesArraySub: Subscription;

  constructor(
    public auth: AuthService,
    private classService: KlasaService,
    private uczenService: uczenService
  ) {}

  ngOnInit() {
    this.classForm = new FormGroup({
      className: new FormControl(null, {
        validators: [Validators.required]
      }),
      classDescription: new FormControl(null, {})
    });

    this.classesArraySub = this.classService.getClasses().subscribe(c => {
      this.classArray = [...c];
    });

    // Students
    this.uczenArraySub = this.uczenService.getUczniowie().subscribe(u => {
      this.uczenArray = [...u];
      this.dataSource = new MatTableDataSource([...this.uczenArray]);
    });
  }

  onClassSubmit() {
    if (this.classForm.invalid) return;
    let classData = new Klasa(
      undefined,
      this.classForm.value.className,
      this.classForm.value.classDescription
    );
    this.classService.addClass(classData);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addStudentToClass(uczenData: Uczen, className: string) {
    this.classService.addStudentToClass(uczenData, className);
    this.classService.updateStudentClass(uczenData, className);
  }

  bee(shit: string) {
    this.classSelected = true;
    this.selectedClassID = shit;
    this.classService.getSpecificClass(shit).subscribe(x => {
      this.fetchedClassParameters = x;
      this.classService.getSpecificClassStudents(shit).subscribe(d => {
        this.fetchedClassStudents = d;
      });
    });
  }

  removeFromClassStudents(uczenData: Uczen, className: string) {
    this.classService.removeStudentFromClass(uczenData, className);
  }
}
