import { Component, OnInit } from "@angular/core";
import { AdminOgloszeniaFormComponent } from "./form/admin-ogloszenia-form.component";
import { MatDialog } from "@angular/material";
import { Ogloszenie } from "../models/ogloszenie.model";
import { Subscription } from "rxjs";
import { OgloszenieService } from "./ogloszenia.service";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

@Component({
  selector: "app-admin-ogloszenia",
  templateUrl: "./admin-ogloszenia.component.html",
  styleUrls: ["./admin-ogloszenia.component.css"]
})
export class AdminOgloszeniaComponent implements OnInit {
  sectionTitle: string = "Zarządzanie Ogłoszeniami";
  ogloszeniaArraySub: Subscription;
  ogloszeniaArray: Ogloszenie[];

  public Editor = DecoupledEditor;
  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  constructor(
    private dialog: MatDialog,
    private ogloszeniaService: OgloszenieService
  ) {}

  ngOnInit() {
    this.ogloszeniaArraySub = this.ogloszeniaService
      .getOgloszenia()
      .subscribe(u => {
        this.ogloszeniaArray = [...u];
      });
  }

  dodajOgloszenie() {
    this.dialog.open(AdminOgloszeniaFormComponent, {
      maxHeight: "70vw",
      data: {
        ogloszenieID: undefined
      }
    });
  }

  editOgloszenie(ogloszenie: Ogloszenie) {
    this.dialog.open(AdminOgloszeniaFormComponent, {
      maxHeight: "70vw",
      data: ogloszenie
    });
  }

  onOgloszenieRemove(ogloszenie: Ogloszenie) {
    this.ogloszeniaService.deleteOgloszenie(ogloszenie);
  }
}
