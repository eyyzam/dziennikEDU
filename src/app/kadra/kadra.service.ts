import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Uczen } from "../models/uczen.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Pracownik } from "../models/kadra.model";

@Injectable({ providedIn: "root" })
export class KadraService {
  constructor(private readonly db: AngularFirestore) {}

  getPracownicy() {
    let pracownicyCollection: AngularFirestoreCollection<Pracownik> = this.db.collection<
      Pracownik
    >("pracownicy");
    let pracownicy: Observable<Pracownik[]> = pracownicyCollection
      .snapshotChanges()
      .pipe(
        map(a =>
          a.map(pracownik => {
            const pracownikAssignment = {
              pracownikID: pracownik.payload.doc.id,
              imie: pracownik.payload.doc.data().imie,
              nazwisko: pracownik.payload.doc.data().nazwisko,
              szkolaID: pracownik.payload.doc.data().szkolaID,
              pedagog: pracownik.payload.doc.data().pedagog,
              status: pracownik.payload.doc.data().status
            } as Pracownik;
            return pracownikAssignment;
          })
        )
      );
    return pracownicy;
  }

  addPracownik(data: Pracownik) {
    let pracownicyCollection: AngularFirestoreCollection = this.db.collection(
      "pracownicy"
    );
    return pracownicyCollection.add({
      imie: data.imie,
      nazwisko: data.nazwisko,
      szkolaID: data.szkolaID,
      pedagog: data.pedagog,
      status: data.status
    });
  }

  updatePracownik(data: Pracownik) {
    let pracownicyDocRef = this.db
      .collection("pracownicy")
      .doc(`${data.pracownikID}`);
    return pracownicyDocRef.update({
      imie: data.imie,
      nazwisko: data.nazwisko,
      szkolaID: data.szkolaID,
      pedagog: data.pedagog,
      status: data.status
    });
  }
}
