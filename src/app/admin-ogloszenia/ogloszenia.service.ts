import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import { Ogloszenie } from "../models/ogloszenie.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class OgloszenieService {
  constructor(private readonly db: AngularFirestore) {}

  getOgloszenia() {
    let ogloszenieCollection: AngularFirestoreCollection<Ogloszenie> = this.db.collection<
      Ogloszenie
    >("ogloszenia");
    let ogloszenia: Observable<Ogloszenie[]> = ogloszenieCollection
      .snapshotChanges()
      .pipe(
        map(a =>
          a.map(ogloszenie => {
            const ogloszenieAssignment = {
              ogloszenieID: ogloszenie.payload.doc.id,
              ogloszenieNadawcaID: ogloszenie.payload.doc.data()
                .ogloszenieNadawcaID,
              ogloszenieTytul: ogloszenie.payload.doc.data().ogloszenieTytul,
              ogloszenieGrupaOdbiorcow: ogloszenie.payload.doc.data()
                .ogloszenieGrupaOdbiorcow,
              ogloszenieContent: ogloszenie.payload.doc.data()
                .ogloszenieContent,
              ogloszenieAktywne: ogloszenie.payload.doc.data().ogloszenieAktywne
            } as Ogloszenie;
            return ogloszenieAssignment;
          })
        )
      );
    return ogloszenia;
  }

  addOgloszenie(data: Ogloszenie) {
    let ogloszenieCollection: AngularFirestoreCollection = this.db.collection(
      "ogloszenia"
    );
    return ogloszenieCollection.add({
      ogloszenieNadawcaID: data.ogloszenieNadawcaID,
      ogloszenieTytul: data.ogloszenieTytul,
      ogloszenieGrupaOdbiorcow: data.ogloszenieGrupaOdbiorcow,
      ogloszenieContent: data.ogloszenieContent,
      ogloszenieAktywne: data.ogloszenieAktywne
    });
  }

  updateOgloszenie(data: Ogloszenie) {
    let ogloszenieDocRef = this.db
      .collection("ogloszenia")
      .doc(`${data.ogloszenieID}`);
    return ogloszenieDocRef.update({
      ogloszenieNadawcaID: data.ogloszenieNadawcaID,
      ogloszenieTytul: data.ogloszenieTytul,
      ogloszenieGrupaOdbiorcow: data.ogloszenieGrupaOdbiorcow,
      ogloszenieContent: data.ogloszenieContent,
      ogloszenieAktywne: data.ogloszenieAktywne
    });
  }

  deleteOgloszenie(data: Ogloszenie) {
    let ogloszenieDocRef = this.db
      .collection("ogloszenia")
      .doc(data.ogloszenieID);
    return ogloszenieDocRef.delete();
  }
}
