import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Uczen } from "../models/uczen.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

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
              wychowawcaID: uczen.payload.doc.data().wychowawcaID,
              status: uczen.payload.doc.data().status
            } as Uczen;
            return uczenAssignment;
          })
        )
      );
    return uczniowie;
  }

  addUczen(data: Uczen) {
    let uczniowieCollection: AngularFirestoreCollection = this.db.collection(
      "uczniowie"
    );
    return uczniowieCollection.add({
      imie: data.imie,
      nazwisko: data.nazwisko,
      klasa: null,
      numerWDzienniku: data.numerWDzienniku,
      szkolaID: data.szkolaID,
      wychowawcaID: data.wychowawcaID,
      status: data.status
    });
  }

  updateUczen(data: Uczen) {
    let uczniowieDocRef = this.db
      .collection("uczniowie")
      .doc(`${data.uczenID}`);
    return uczniowieDocRef.update({
      imie: data.imie,
      nazwisko: data.nazwisko,
      klasa: data.klasa,
      numerWDzienniku: data.numerWDzienniku,
      szkolaID: data.szkolaID,
      wychowawcaID: data.wychowawcaID,
      status: data.status
    });
  }
}
