import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { KadraService } from "../kadra.service";
import { Pracownik } from "src/app/models/kadra.model";

@Component({
  selector: "app-kadra-form",
  templateUrl: "./kadra-form.component.html",
  styleUrls: ["./kadra-form.component.css"]
})
export class KadraFormComponent implements OnInit {
  isLoading: boolean = true;
  form_mode: string = "CREATE";
  pracownikForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<KadraFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private employeeService: KadraService
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.pracownikForm = new FormGroup({
      pracownikImie: new FormControl(null, {
        validators: [Validators.required]
      }),
      pracownikNazwisko: new FormControl(null, {
        validators: [Validators.required]
      }),
      pracownikSzkolaID: new FormControl(null, {
        validators: [Validators.required]
      }),
      pracownikPedagog: new FormControl(null, {
        validators: [Validators.required]
      }),
      pracownikStatus: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    if (this.data.pracownikID !== undefined) {
      this.form_mode = "EDIT";
      this.pracownikForm.setValue({
        pracownikImie: this.data.imie,
        pracownikNazwisko: this.data.nazwisko,
        pracownikSzkolaID: this.data.szkolaID,
        pracownikPedagog: this.data.pedagog,
        pracownikStatus: this.data.status
      });
    }
    this.isLoading = false;
  }

  onPracownikSubmit() {
    if (this.pracownikForm.invalid) return;
    let pracownikData = new Pracownik(
      this.form_mode === "CREATE" ? undefined : this.data.pracownikID,
      this.pracownikForm.value.pracownikImie,
      this.pracownikForm.value.pracownikNazwisko,
      this.pracownikForm.value.pracownikSzkolaID,
      this.pracownikForm.value.pracownikPedagog,
      this.pracownikForm.value.pracownikStatus
    );
    if (this.form_mode === "CREATE") {
      this.employeeService.addPracownik(pracownikData);
      this.dialogRef.close();
    } else if (this.form_mode === "EDIT") {
      this.employeeService.updatePracownik(pracownikData);
      this.dialogRef.close();
    }
  }
}
