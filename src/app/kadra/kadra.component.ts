import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Pracownik } from "../models/kadra.model";
import { KadraService } from "./kadra.service";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { MatTableDataSource } from "@angular/material";
import { MatDialog } from "@angular/material/dialog";
import { KadraFormComponent } from "./form/kadra-form.component";

@Component({
  selector: "app-kadra",
  templateUrl: "./kadra.component.html",
  styleUrls: ["./kadra.component.css"],
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
export class KadraComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, private uczenService: KadraService) {}

  sectionTitle: string = "Zarządzanie Kadrą";
  kadraArraySub: Subscription;
  kadraArray: Pracownik[];
  displayedColumns: string[] = [
    "imie",
    "nazwisko",
    "pedagog",
    "status",
    "akcje"
  ];
  dataSource: any;

  ngOnInit() {
    this.kadraArraySub = this.uczenService.getPracownicy().subscribe(u => {
      this.kadraArray = [...u];
      this.dataSource = new MatTableDataSource([...this.kadraArray]);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newPracownik() {
    this.dialog.open(KadraFormComponent, {
      maxHeight: "70vw",
      data: {
        pracownikID: undefined
      }
    });
  }

  editPracownik(pracownik: Pracownik) {
    this.dialog.open(KadraFormComponent, {
      maxHeight: "70vw",
      data: pracownik
    });
  }

  makePracownikStatusUnactive(pracownik: Pracownik) {
    console.log(pracownik.pracownikID);
  }

  ngOnDestroy() {
    this.kadraArraySub.unsubscribe();
  }
}
