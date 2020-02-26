import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { uczenService } from "../uczniowie.service";
import { Uczen } from "src/app/models/uczen.model";

@Component({
  selector: "app-uczen-form",
  templateUrl: "./uczen-form.component.html",
  styleUrls: ["./uczen-form.component.css"]
})
export class UczenFormComponent implements OnInit {
  isLoading: boolean = true;
  form_mode: string = "CREATE";
  studentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UczenFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private uczenService: uczenService
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.studentForm = new FormGroup({
      uczenImie: new FormControl(null, {
        validators: [Validators.required]
      }),
      uczenNazwisko: new FormControl(null, {
        validators: [Validators.required]
      }),
      uczenKlasa: new FormControl(null, {
        validators: [Validators.required]
      }),
      uczenNumerWDzienniku: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(999)
        ]
      }),
      uczenSzkolaID: new FormControl(null, {
        validators: [Validators.required]
      }),
      uczenWychowawcaID: new FormControl(null, {
        validators: [Validators.required]
      }),
      uczenStatus: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    if (this.data.uczenID !== undefined) {
      this.form_mode = "EDIT";
      this.studentForm.setValue({
        uczenImie: this.data.imie,
        uczenNazwisko: this.data.nazwisko,
        uczenKlasa: this.data.klasa,
        uczenNumerWDzienniku: this.data.numerWDzienniku,
        uczenSzkolaID: this.data.szkolaID,
        uczenWychowawcaID: this.data.wychowawcaID,
        uczenStatus: this.data.status
      });
    }
    this.isLoading = false;
  }

  onUczenSubmit() {
    if (this.studentForm.invalid) return;
    let studentData = new Uczen(
      this.form_mode === "CREATE" ? undefined : this.data.uczenID,
      this.studentForm.value.uczenImie,
      this.studentForm.value.uczenNazwisko,
      this.studentForm.value.uczenKlasa,
      this.studentForm.value.uczenNumerWDzienniku,
      this.studentForm.value.uczenSzkolaID,
      this.studentForm.value.uczenWychowawcaID,
      this.studentForm.value.uczenStatus
    );
    if (this.form_mode === "CREATE") {
      this.uczenService.addUczen(studentData);
      this.dialogRef.close();
    } else if (this.form_mode === "EDIT") {
      this.uczenService.updateUczen(studentData);
      this.dialogRef.close();
    }
  }
}
