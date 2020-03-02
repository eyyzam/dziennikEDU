import { Component, OnInit, Inject } from "@angular/core";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OgloszenieService } from "../ogloszenia.service";
import { Ogloszenie } from "src/app/models/ogloszenie.model";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-admin-ogloszenia-form",
  templateUrl: "./admin-ogloszenia-form.component.html",
  styleUrls: ["./admin-ogloszenia-form.component.css"]
})
export class AdminOgloszeniaFormComponent implements OnInit {
  public Editor = DecoupledEditor;
  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  isLoading: boolean = true;
  form_mode: string = "CREATE";
  ogloszenieForm: FormGroup;
  ogloszenieContent: string = "";

  constructor(
    public dialogRef: MatDialogRef<AdminOgloszeniaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private ogloszeniaService: OgloszenieService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.ogloszenieForm = new FormGroup({
      ogloszenieTytul: new FormControl(null, {
        validators: [Validators.required]
      }),
      ogloszenieGrupaOdbiorcow: new FormControl(null, {
        validators: [Validators.required]
      }),
      ogloszenieAktywne: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    if (this.data.ogloszenieID !== undefined) {
      this.form_mode = "EDIT";
      this.ogloszenieForm.setValue({
        ogloszenieTytul: this.data.ogloszenieTytul,
        ogloszenieGrupaOdbiorcow: this.data.ogloszenieGrupaOdbiorcow,
        ogloszenieAktywne: this.data.ogloszenieAktywne
      });
    }
    this.ogloszenieContent = this.data.ogloszenieContent;
    this.isLoading = false;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onOgloszenieSubmit() {
    if (this.ogloszenieForm.invalid) return;
    let ogloszenieData = new Ogloszenie(
      this.form_mode === "CREATE" ? undefined : this.data.ogloszenieID,
      this.authService.userData.uid,
      this.ogloszenieForm.value.ogloszenieTytul,
      this.ogloszenieForm.value.ogloszenieGrupaOdbiorcow,
      this.ogloszenieContent,
      this.ogloszenieForm.value.ogloszenieAktywne
    );
    if (this.form_mode === "CREATE") {
      this.ogloszeniaService.addOgloszenie(ogloszenieData);
      this.dialogRef.close();
    } else if (this.form_mode === "EDIT") {
      this.ogloszeniaService.updateOgloszenie(ogloszenieData);
      this.dialogRef.close();
    }
  }
}
