import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Uczen } from "../models/uczen.model";
import { uczenService } from "./uczniowie.service";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { MatTableDataSource } from "@angular/material";
import { MatDialog } from "@angular/material/dialog";
import { UczenFormComponent } from "./form/uczen-form.component";

@Component({
  selector: "app-uczniowie",
  templateUrl: "./uczniowie.component.html",
  styleUrls: ["./uczniowie.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class UczniowieComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, private uczenService: uczenService) {}

  sectionTitle: string = "Zarządzanie uczniami";
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

  ngOnInit() {
    this.uczenArraySub = this.uczenService.getUczniowie().subscribe(u => {
      this.uczenArray = [...u];
      this.dataSource = new MatTableDataSource([...this.uczenArray]);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newStudent() {
    this.dialog.open(UczenFormComponent, {
      maxHeight: "70vw",
      data: {
        uczenID: undefined
      }
    });
  }

  editStudent(uczen: Uczen) {
    this.dialog.open(UczenFormComponent, {
      width: "1000px",
      height: "600px",
      data: uczen
    });
  }

  makeStudentStatusUnactive(uczen: Uczen) {
    console.log(uczen.uczenID);
  }

  ngOnDestroy() {
    this.uczenArraySub.unsubscribe();
  }
}
