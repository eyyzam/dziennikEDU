import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Uczen } from "../models/uczen.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

@Injectable({ providedIn: "root" })
export class uczenService {
  constructor(private readonly db: AngularFirestore) {}

  getUczniowie() {
    let uczniowieCollection: AngularFirestoreCollection<Uczen> = this.db.collection<
      Uczen
    >("uczniowie");
    let uczniowie: Observable<Uczen[]> = uczniowieCollection
      .snapshotChanges()
      .pipe(
        map(a =>
          a.map(uczen => {
            const uczenAssignment = {
              uczenID: uczen.payload.doc.id,
              imie: uczen.payload.doc.data().imie,
              nazwisko: uczen.payload.doc.data().nazwisko,
              klasa: uczen.payload.doc.data().klasa,
              numerWDzienniku: uczen.payload.doc.data().numerWDzienniku,
              szkolaID: uczen.payload.doc.data().szkolaID,
              wychowawcaID: uczen.payload.doc.data().wychowawcaID
            } as Uczen;
            return uczenAssignment;
          })
        )
      );
    return uczniowie;
  }
}
