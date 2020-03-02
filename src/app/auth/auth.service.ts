import { Injectable, NgZone } from "@angular/core";
import { User } from "./models/user.model";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userData: any;
  private permittedUsersArray: any;
  canActivateStudentRoutes: boolean = false;
  canActivateTeacherRoutes: boolean = false;
  canActivateAdminRoutes: boolean = false;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private http: HttpClient
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
        this.getJSON().subscribe(data => {
          this.permissionAssignment(user.uid, data);
        });
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  private permissionAssignment(userID: string, data: any) {
    this.permittedUsersArray = data;
    if (this.permittedUsersArray[userID]) {
      this.canActivateStudentRoutes = this.permittedUsersArray[
        userID
      ].roles.student;
      this.canActivateTeacherRoutes = this.permittedUsersArray[
        userID
      ].roles.nauczyciel;
      this.canActivateAdminRoutes = this.permittedUsersArray[
        userID
      ].roles.admin;
      this.router.navigate(["/oceny"]);
    } else {
      this.canActivateStudentRoutes = true;
      this.canActivateTeacherRoutes = false;
      this.canActivateAdminRoutes = false;
    }
  }

  private _jsonURL = "assets/permissions.json";

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.getJSON().subscribe(data => {
          this.permissionAssignment(result.user.uid, data);
          this.ngZone.run(() => {
            this.router.navigate(["/oceny"]);
          });
          this.SetUserData(result.user);
        });
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  SignUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(["/user/email-verify"]);
    });
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      })
      .catch(error => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(["/oceny"]);
        });
        this.SetUserData(result.user);
      })
      .catch(error => {
        window.alert(error);
      });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      roles: null
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate([""]);
    });
  }
}
