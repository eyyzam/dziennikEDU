import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Uczen } from "../models/uczen.model";
import { map, mapTo } from "rxjs/operators";
import { Observable, merge, zip, observable } from "rxjs";
import { Klasa } from "../models/klasa.model";

@Injectable({ providedIn: "root" })
export class KlasaService {
  constructor(private readonly db: AngularFirestore) {}

  getClasses() {
    let classCollection: AngularFirestoreCollection<Klasa> = this.db.collection<
      Klasa
    >("klasy");
    let klasy: Observable<Klasa[]> = classCollection.snapshotChanges().pipe(
      map(a =>
        a.map(uczen => {
          const classAssignment = {
            classID: uczen.payload.doc.id,
            name: uczen.payload.doc.data().name,
            description: uczen.payload.doc.data().description,
            students: uczen.payload.doc.data().students
          } as Klasa;
          return classAssignment;
        })
      )
    );
    return klasy;
  }

  getSpecificClass(className: string) {
    let classColDocRef: AngularFirestoreDocument<Klasa> = this.db
      .collection<Klasa>("klasy")
      .doc(`${className}`);

    let klasa: Observable<Klasa> = classColDocRef.snapshotChanges().pipe(
      map(a => {
        const classAssignment = {
          classID: a.payload.id,
          name: a.payload.data().name,
          description: a.payload.data().description
        } as Klasa;
        return classAssignment;
      })
    );
    return klasa;
  }

  getSpecificClassStudents(className: string) {
    let studentsDocRef: AngularFirestoreCollection = this.db
      .collection("klasy")
      .doc(className)
      .collection("studenci");
    let studenci: Observable<Uczen[]> = studentsDocRef.snapshotChanges().pipe(
      map(a =>
        a.map(b => {
          const studentsAssignment = {
            uczenID: b.payload.doc.id,
            imie: b.payload.doc.data().imie,
            nazwisko: b.payload.doc.data().nazwisko,
            klasa: b.payload.doc.data().klasa,
            numerWDzienniku: b.payload.doc.data().numerWDzienniku,
            szkolaID: b.payload.doc.data().szkolaID,
            wychowawcaID: b.payload.doc.data().wychowawcaID,
            status: b.payload.doc.data().status
          } as Uczen;
          return studentsAssignment;
        })
      )
    );
    return studenci;
  }

  removeStudentFromClass(student: Uczen, className: string) {
    let studentsDocRef: AngularFirestoreDocument = this.db
      .collection("klasy")
      .doc(className)
      .collection("studenci")
      .doc(student.uczenID);
    return studentsDocRef.delete();
  }

  addStudentToClass(student: Uczen, className: string) {
    let ref = this.db
      .collection("klasy")
      .doc(className)
      .collection("studenci")
      .doc(student.uczenID);
    return ref.set({
      uczenID: student.uczenID,
      imie: student.imie,
      nazwisko: student.nazwisko,
      klasa: student.klasa,
      numerWDzienniku: student.numerWDzienniku,
      szkolaID: student.szkolaID,
      wychowawcaID: student.wychowawcaID,
      status: student.status
    });
  }

  updateStudentClass(student: Uczen, className) {
    let uczenDoc: AngularFirestoreDocument = this.db
      .collection("uczniowie")
      .doc(student.uczenID);
    uczenDoc.set({
      imie: student.imie,
      nazwisko: student.nazwisko,
      klasa: className,
      numerWDzienniku: student.numerWDzienniku,
      szkolaID: student.szkolaID,
      wychowawcaID: student.wychowawcaID,
      status: student.status
    });
  }

  addClass(a: Klasa) {
    let classDocRef = this.db.collection("klasy").doc(`${a.name}`);
    return classDocRef.set({
      name: a.name,
      description: a.description
    });
  }
}
